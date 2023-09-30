import Posts from './Posts.jsx';
import Form from './Form.jsx';
import { useState, useEffect } from 'react';

export default function Body() {
  const [postData, setPostData] = useState([]);

  const fetchData = async () => {
    const fetchedData = fetch(
      'https://online-chat-backend-azure.vercel.app/api/getPosts'
    );
    const fetchedDataJson = await (await fetchedData).json();
    setPostData(fetchedDataJson.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='app-container'>
      <Posts postData={postData} />
      <Form fetchAgain={fetchData} />
    </div>
  );
}
