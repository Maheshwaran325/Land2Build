import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SceneContainer, { type CameraPresetType } from './3d/SceneContainer';
import { generateBuildingConfig, predictCostAndMaterials, isAIConfigured, type BuildingConfig, type LandInputs } from '../services/aiService';
import { db, type Project } from '../db';
import type { HouseType } from './3d/procedural/FloorPlan';

interface ModelViewerProps {
  project?: Project;
}

const CAMERA_PRESETS: { id: CameraPresetType; label: string; icon: string }[] = [
  { id: 'perspective', label: 'Perspective', icon: 'view_in_ar' },
  { id: 'front', label: 'Front', icon: 'crop_portrait' },
  { id: 'side', label: 'Side', icon: 'crop_landscape' },
  { id: 'top', label: 'Top', icon: 'crop_din' },
  { id: 'walkthrough', label: 'Walk', icon: 'directions_walk' },
];

const ModelViewer = ({ project }: ModelViewerProps) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const getInitialDimensions = () => {
    if (!project) return { width: 10, length: 12, floors: 2 };
    const floors = project.floors || 2;
    const totalArea = project.totalArea || (project.plotSize * 0.6 * floors);
    let footprint = totalArea / floors;
    if (footprint < 200 && totalArea > 200) {
      footprint = totalArea;
    }
    const sideLength = Math.sqrt(footprint / 10.764);
    return {
      width: Math.round(sideLength * 0.8),
      length: Math.round(sideLength * 1.2),
      floors: floors
    };
  };

  const initialDims = useMemo(() => getInitialDimensions(), [project?.id, project?.totalArea, project?.plotSize]);

  const [config, setConfig] = useState<BuildingConfig>({
    width: initialDims.width,
    length: initialDims.length,
    floors: initialDims.floors,
    roofType: 'gable',
    wallMaterial: 'brick',
    designStyle: 'modern'
  });

  useEffect(() => {
    setConfig({
      width: initialDims.width,
      length: initialDims.length,
      floors: initialDims.floors,
      roofType: 'gable',
      wallMaterial: 'brick',
      designStyle: 'modern'
    });
  }, [initialDims]);

  // AI state
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // View controls
  const [viewMode, setViewMode] = useState<'rendered' | 'wireframe' | 'blueprint'>('rendered');
  const [cameraPreset, setCameraPreset] = useState<CameraPresetType>('perspective');
  const [showLabels, setShowLabels] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleGenerateReport = async () => {
    if (!project || !id) return;
    const widthFt = config.width * 3.28084;
    const lengthFt = config.length * 3.28084;
    const areaPerFloorSqFt = widthFt * lengthFt;
    const newTotalArea = Math.round(areaPerFloorSqFt * config.floors);

    const hasChanges =
      config.width !== initialDims.width ||
      config.length !== initialDims.length ||
      config.floors !== initialDims.floors;

    if (hasChanges) {
      setIsUpdating(true);
      try {
        const aiInputs: LandInputs = {
          plotSize: project.plotSize,
          city: project.city || 'Chennai',
          constructionType: project.constructionType || 'residential',
          floors: config.floors,
          builtUpPercent: Math.round((areaPerFloorSqFt / project.plotSize) * 100) || 60,
          foundationType: project.foundationType || 'rcc'
        };
        const result = await predictCostAndMaterials(aiInputs);
        const fallbackCost = Math.round(newTotalArea * 1800);
        await db.projects.update(parseInt(id), {
          floors: config.floors,
          totalArea: newTotalArea,
          estimatedCost: result?.totalCost || fallbackCost,
          materials: result?.materials || project.materials || []
        });
      } catch (error) {
        console.error('Failed to update project:', error);
      } finally {
        setIsUpdating(false);
      }
    }
    navigate(`/project/${id}/cost-analysis`);
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const result = await generateBuildingConfig(aiPrompt);
      if (result) setConfig(result);
    } catch (error) {
      console.error('AI Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    const elem = document.getElementById('model-viewer-container');
    if (!elem) return;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <main className="flex-1 flex overflow-auto relative min-h-[600px]">
      {/* Left Sidebar - Building Controls */}
      <aside className="w-72 flex-none flex flex-col border-r border-border-light bg-secondary z-10 hidden lg:flex">
        <div className="p-4 border-b border-border-light flex items-center justify-between">
          <h3 className="text-dark-slate font-bold text-sm uppercase tracking-wider">Building Config</h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setConfig({
                width: initialDims.width,
                length: initialDims.length,
                floors: initialDims.floors,
                roofType: 'gable',
                wallMaterial: 'brick',
                designStyle: 'modern'
              })}
              className="p-1 text-subtext hover:text-primary hover:bg-primary/5 rounded transition"
              title="Reset Config"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            </button>
            <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
          </div>
        </div>

        {/* AI Prompt Section */}
        <div className="p-4 border-b border-border-light bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
            <span className="text-sm font-bold text-dark-slate">AI Architect</span>
            {!isAIConfigured() && (
              <span className="text-xs text-red-500">(No API Key)</span>
            )}
          </div>
          <textarea
            className="w-full h-20 p-2 text-sm border border-border-light rounded-lg resize-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="Describe your building... e.g., 'Modern 2-story house with flat roof'"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            disabled={isGenerating}
          />
          <button
            onClick={handleAIGenerate}
            disabled={isGenerating || !aiPrompt.trim()}
            className="mt-2 w-full py-2 bg-primary-gradient text-white text-sm font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <span className="animate-spin material-symbols-outlined text-[16px]">progress_activity</span>
                Generating...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                Generate with AI
              </>
            )}
          </button>
        </div>

        {/* Manual Controls */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-subtext uppercase tracking-wider mb-2">
              Width (meters)
            </label>
            <input
              type="range" min="5" max="30"
              value={config.width}
              onChange={(e) => setConfig({ ...config, width: Number(e.target.value) })}
              className="w-full"
            />
            <div className="text-right text-sm font-mono text-dark-slate">{config.width}m</div>
          </div>

          <div>
            <label className="block text-xs font-bold text-subtext uppercase tracking-wider mb-2">
              Length (meters)
            </label>
            <input
              type="range" min="5" max="40"
              value={config.length}
              onChange={(e) => setConfig({ ...config, length: Number(e.target.value) })}
              className="w-full"
            />
            <div className="text-right text-sm font-mono text-dark-slate">{config.length}m</div>
          </div>

          <div>
            <label className="block text-xs font-bold text-subtext uppercase tracking-wider mb-2">
              Floors
            </label>
            <input
              type="range" min="1" max="5"
              value={config.floors}
              onChange={(e) => setConfig({ ...config, floors: Number(e.target.value) })}
              className="w-full"
            />
            <div className="text-right text-sm font-mono text-dark-slate">{config.floors}</div>
          </div>

          <div>
            <label className="block text-xs font-bold text-subtext uppercase tracking-wider mb-2">Roof Type</label>
            <select
              value={config.roofType}
              onChange={(e) => setConfig({ ...config, roofType: e.target.value as 'flat' | 'gable' | 'hip' })}
              className="w-full p-2 border border-border-light rounded-lg text-sm"
            >
              <option value="flat">Flat</option>
              <option value="gable">Gable</option>
              <option value="hip">Hip</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-subtext uppercase tracking-wider mb-2">Wall Material</label>
            <select
              value={config.wallMaterial}
              onChange={(e) => setConfig({ ...config, wallMaterial: e.target.value as 'brick' | 'concrete' | 'aac_block' })}
              className="w-full p-2 border border-border-light rounded-lg text-sm"
            >
              <option value="brick">Brick</option>
              <option value="concrete">Concrete</option>
              <option value="aac_block">AAC Block</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-subtext uppercase tracking-wider mb-2">Design Style</label>
            <select
              value={config.designStyle || 'modern'}
              onChange={(e) => setConfig({ ...config, designStyle: e.target.value as any })}
              className="w-full p-2 border border-border-light rounded-lg text-sm"
            >
              <option value="modern">Modern (Open Plan)</option>
              <option value="traditional">Traditional (Closed)</option>
              <option value="colonial">Colonial</option>
              <option value="minimalist">Minimalist</option>
            </select>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border-light space-y-2">
          <button
            onClick={() => id && navigate(`/project/${id}/weather`)}
            className="w-full py-2 rounded-lg border border-border-light text-subtext text-sm hover:text-primary hover:border-primary hover:bg-primary/5 transition flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">cloud</span>
            View Weather Impact
          </button>
          <button
            onClick={() => id && navigate(`/project/${id}/cost-analysis`)}
            className="w-full py-2 rounded-lg border border-border-light text-subtext text-sm hover:text-primary hover:border-primary hover:bg-primary/5 transition flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">currency_rupee</span>
            View Cost Analysis
          </button>
        </div>
      </aside>

      {/* 3D Viewport */}
      <section
        id="model-viewer-container"
        className="flex-1 relative bg-canvas overflow-hidden"
      >
        <SceneContainer
          width={config.width}
          length={config.length}
          floors={config.floors}
          roofType={config.roofType}
          wallColor={config.wallMaterial === 'brick' ? '#c45c3e' : config.wallMaterial === 'concrete' ? '#a0a0a0' : '#e8e4d9'}
          viewMode={viewMode}
          designStyle={config.designStyle}
          houseType={project?.houseType as HouseType || 'standard'}
          cameraPreset={cameraPreset}
          showLabels={showLabels}
          showDimensions={showDimensions}
          showSection={showSection}
          isNightMode={isNightMode}
        />

        {/* === PROFESSIONAL TOOLBAR === */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/95 backdrop-blur-xl shadow-lg rounded-xl p-1.5 border border-gray-200/60">
          {/* Camera Presets */}
          {CAMERA_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setCameraPreset(preset.id)}
              className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                cameraPreset === preset.id
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-200'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              }`}
              title={preset.label}
            >
              <span className="material-symbols-outlined text-[18px]">{preset.icon}</span>
              <span className="text-[10px]">{preset.label}</span>
            </button>
          ))}

          <div className="w-px h-8 bg-gray-200 mx-1" />

          {/* View Mode Toggles */}
          <button
            onClick={() => setViewMode('rendered')}
            className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'rendered' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
            title="Rendered View"
          >
            <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
          </button>
          <button
            onClick={() => setViewMode('blueprint')}
            className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'blueprint' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
            title="3D Blueprint Mode"
          >
            <span className="material-symbols-outlined text-[20px]">architecture</span>
          </button>
          <button
            onClick={() => setViewMode('wireframe')}
            className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'wireframe' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
            title="Wireframe"
          >
            <span className="material-symbols-outlined text-[20px]">grid_4x4</span>
          </button>

          <div className="w-px h-8 bg-gray-200 mx-1" />

          {/* Analysis Tools */}
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`p-2 rounded-lg transition-all duration-200 ${showLabels ? 'bg-violet-500 text-white shadow-md shadow-violet-200' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
            title="Room Labels"
          >
            <span className="material-symbols-outlined text-[20px]">label</span>
          </button>
          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className={`p-2 rounded-lg transition-all duration-200 ${showDimensions ? 'bg-orange-500 text-white shadow-md shadow-orange-200' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
            title="Dimensions"
          >
            <span className="material-symbols-outlined text-[20px]">straighten</span>
          </button>
          <button
            onClick={() => setShowSection(!showSection)}
            className={`p-2 rounded-lg transition-all duration-200 ${showSection ? 'bg-red-500 text-white shadow-md shadow-red-200' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
            title="Section Cut"
          >
            <span className="material-symbols-outlined text-[20px]">content_cut</span>
          </button>

          <div className="w-px h-8 bg-gray-200 mx-1" />

          {/* Environment */}
          <button
            onClick={() => setIsNightMode(!isNightMode)}
            className={`p-2 rounded-lg transition-all duration-200 ${isNightMode ? 'bg-indigo-900 text-yellow-300 shadow-md' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
            title={isNightMode ? 'Day Mode' : 'Night Mode'}
          >
            <span className="material-symbols-outlined text-[20px]">{isNightMode ? 'dark_mode' : 'light_mode'}</span>
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            <span className="material-symbols-outlined text-[20px]">{isFullscreen ? 'close_fullscreen' : 'fullscreen'}</span>
          </button>
        </div>

        {/* Info Panel */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-xl p-4 border border-gray-200/60 shadow-lg max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-indigo-500 text-[18px]">analytics</span>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Building Stats</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            <span className="text-gray-400">Floor Area:</span>
            <span className="font-mono text-gray-800 font-medium">{config.width * config.length} m²</span>
            <span className="text-gray-400">Total Area:</span>
            <span className="font-mono text-gray-800 font-medium">{config.width * config.length * config.floors} m²</span>
            <span className="text-gray-400">Height:</span>
            <span className="font-mono text-gray-800 font-medium">{config.floors * 3}m</span>
            <span className="text-gray-400">Type:</span>
            <span className="font-mono text-gray-800 font-medium capitalize">{project?.houseType || 'Standard'}</span>
          </div>
        </div>

        {/* Controls Help */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2.5 border border-gray-200/60 shadow-lg text-xs text-gray-400">
          <span className="font-medium">🖱️ Drag:</span> Rotate &nbsp; | &nbsp;
          <span className="font-medium">⌘ + Drag:</span> Pan &nbsp; | &nbsp;
          <span className="font-medium">Scroll:</span> Zoom
        </div>
      </section>

      {/* Right Sidebar - Properties */}
      <aside className="w-80 flex-none flex flex-col border-l border-border-light bg-secondary z-10 lg:relative absolute right-0 h-full lg:h-auto transform lg:transform-none transition-transform duration-300 translate-x-full lg:translate-x-0" id="propertiesPanel">
        <div className="flex border-b border-border-light">
          <button className="flex-1 py-3 text-sm font-bold text-primary border-b-2 border-primary bg-primary/5">Properties</button>
          <button className="flex-1 py-3 text-sm font-medium text-subtext hover:text-dark-slate hover:bg-white/50 transition-colors">Comments</button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Building Summary</span>
            </div>
            <h2 className="text-xl font-bold text-dark-slate leading-tight">
              {config.floors}-Story {config.roofType === 'flat' ? 'Modern' : 'Traditional'} Building
            </h2>
            <p className="text-subtext text-sm mt-1">{config.wallMaterial.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Construction</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-border-light shadow-sm">
            <h4 className="text-dark-slate font-bold text-sm mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">square_foot</span>
              Dimensions
            </h4>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <div>
                <p className="text-subtext text-xs">Width</p>
                <p className="text-dark-slate text-sm font-mono">{config.width} m</p>
              </div>
              <div>
                <p className="text-subtext text-xs">Length</p>
                <p className="text-dark-slate text-sm font-mono">{config.length} m</p>
              </div>
              <div>
                <p className="text-subtext text-xs">Floors</p>
                <p className="text-dark-slate text-sm font-mono">{config.floors}</p>
              </div>
              <div>
                <p className="text-subtext text-xs">Total Area</p>
                <p className="text-dark-slate text-sm font-mono">{config.width * config.length * config.floors} m²</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border-light pt-5">
            <h4 className="text-dark-slate font-bold text-sm mb-4">Quick Estimate</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-subtext">Est. Cost (Basic)</span>
                  <span className="text-dark-slate font-mono">₹{((config.width * config.length * config.floors) * 1800).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-subtext">Cost per sq.m</span>
                  <span className="text-dark-slate font-mono">₹1,800</span>
                </div>
              </div>
            </div>
          </div>

          {(() => {
            const hasChanges =
              config.width !== initialDims.width ||
              config.length !== initialDims.length ||
              config.floors !== initialDims.floors;

            return (
              <button
                onClick={handleGenerateReport}
                disabled={isUpdating || !hasChanges}
                className={`w-full py-2.5 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 ${hasChanges
                  ? 'bg-primary-gradient text-white hover:opacity-90 shadow-md'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
              >
                {isUpdating ? (
                  <>
                    <span className="animate-spin material-symbols-outlined text-[16px]">progress_activity</span>
                    Updating Estimate...
                  </>
                ) : hasChanges ? (
                  <>
                    <span className="material-symbols-outlined text-[16px]">save_as</span>
                    Save & Generate New Report
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Report Up to Date
                  </>
                )}
              </button>
            );
          })()}
        </div>
      </aside>
    </main>
  );
};

export default ModelViewer;
