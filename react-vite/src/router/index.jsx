import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
// import NotebookDetail from '../components/NotebookDetail';
import NoteList from '../components/NoteList';
import NoteDetail from '../components/NoteDetail';
import NoteEdit from "../components/NoteEdit";
// import TaskList from '../components/TaskList';
import TaskDetail from '../components/TaskDetail';
import CreateTaskModal from '../components/CreateTaskModal';
import TaskEdit from '../components/TaskEdit';
import TagList from '../components/TagList';
import TagDetail from '../components/TagDetail';
import TagCreate from '../components/TagCreate';
import TagEdit from '../components/TagEdit';
// import NotebookEdit from '../components/NotebookEdit/NotebookEdit';
import FeatureTable from '../components/FeatureTable/FeatureTable';



export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "notebooks",
        element: <FeatureTable type='Notebook' />,
      },
      {
        path: "notes",
        element: <NoteList />,
      },
      {
        path: "notes/new",
        element: <NoteDetail />,
      },
      {
        path: "notes/:noteId/edit",
        element: <NoteEdit />,
      },
      {
        path: "tasks",
        element: <FeatureTable type='Task' />,
      },
      {
        path: "tasks/:id",
        element: <TaskDetail />,
      },
      {
        path: "tasks/new",
        element: <CreateTaskModal />,
      },
      {
        path: "tasks/:id/edit",
        element: <TaskEdit/>,
      },
      {
        path: "tags",
        element: <TagList />,
      },
      {
        path: "tags/:tagId",
        element: <TagDetail />,
      },
      {
        path: "tags/new",
        element: <TagCreate />,
      },
      {
        path: "tags/:tagId/edit",
        element: <TagEdit />,
      },
    ],
  },
]);
