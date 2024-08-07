import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import NotebookList from '../components/NotebookList';
import NotebookDetail from '../components/NotebookDetail';
import NoteList from '../components/NoteList';
import NoteDetail from '../components/NoteDetail';
import TaskList from '../components/TaskList';
import TaskDetail from '../components/TaskDetail';
import TaskCreate from '../components/TaskCreate';
import TaskEdit from '../components/TaskEdit';
import TagList from '../components/TagList';
import TagDetail from '../components/TagDetail';
import TagCreate from '../components/TagCreate';
import TagEdit from '../components/TagEdit';
import NotebookEdit from '../components/NotebookEdit/NotebookEdit';
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
        element: <FeatureTable />,
      },
      {
        path: "notebooks/:id",
        element: <NotebookDetail />,
      },
      {
        path: "notebooks/:id/edit",
        element: <NotebookEdit />,
      },
      {
        path: "notes",
        element: <NoteList />,
      },
      {
        path: "notes/:noteid",
        element: <NoteDetail />,
      },
      {
        path: "tasks",
        element: <TaskList />,
      },
      {
        path: "tasks/:id",
        element: <TaskDetail />,
      },
      {
        path: "tasks/new",
        element: <TaskCreate />,
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
