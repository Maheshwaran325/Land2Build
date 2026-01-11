import Header from '../components/NewProjectHeader';
import NewProjectForm from '../components/NewProjectForm';

const NewProjectPage = () => {
  return (
    <div className="bg-background-light text-text-main font-display overflow-x-hidden min-h-screen flex flex-col">
      <Header />
      <NewProjectForm />
    </div>
  );
};

export default NewProjectPage;
