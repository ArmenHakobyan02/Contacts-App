import './App.css';
import TodoHeader from './components/TodoHeder/TodoHeader';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <TodoHeader />
      
      <ToastContainer/>
    </div>
  );
}

export default App;
