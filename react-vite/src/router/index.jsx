import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import NotebookListPage from '../components/NotebookListPage';
import NotebookDetailPage from '../components/NotebookDetailPage';
import NotebookEditPage from '../components/NotebookEditPage';
import NoteListPage from '../components/NoteListPage';
import NoteDetailPage from '../components/NoteDetailPage';
import TaskListPage from '../components/TaskListPage';
import TaskDetailPage from '../components/TaskDetailPage';
import TaskCreatePage from '../components/TaskCreatePage';
import TaskEditPage from '../components/TaskEditPage';
import TagListPage from '../components/TagListPage';
import TagDetailPage from '../components/TagDetailPage';
import TagCreatePage from '../components/TagCreatePage';
import TagEditPage from '../components/TagEditPage';



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
        element: <NotebookListPage />,
      },
      {
        path: "notebooks/:id",
        element: <NotebookDetailPage />,
      },
      {
        path: "notebooks/:id/edit",
        element: <NotebookEditPage />,
      },
      {
        path: "notes",
        element: <NoteListPage />,
      },
      {
        path: "notes/:noteid",
        element: <NoteDetailPage />,
      },
      {
        path: "tasks",
        element: <TaskListPage />,
      },
      {
        path: "tasks/:id",
        element: <TaskDetailPage />,
      },
      {
        path: "tasks/new",
        element: <TaskCreatePage />,
      },
      {
        path: "tasks/:id/edit",
        element: <TaskEditPage />,
      },
      {
        path: "tags",
        element: <TagListPage />,
      },
      {
        path: "tags/:tagId",
        element: <TagDetailPage />,
      },
      {
        path: "tags/new",
        element: <TagCreatePage />,
      },
      {
        path: "tags/:tagId/edit",
        element: <TagEditPage />,
      },
    ],
  },
]);
