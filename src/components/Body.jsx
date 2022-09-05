import Post from './Post.jsx';
import Form from './Form.jsx';
import { useState, useEffect } from 'react';
export default function Body(){
    const [postData, setPostData] = useState([]);

    const fetchData = async()=>{
        const fetchedData = fetch('http://localhost:5000/getPosts');
        const fetchedDataJson = await (await fetchedData).json();
        setPostData(fetchedDataJson.data);
    }

    useEffect(()=>{
        fetchData();
    }, [])

    return (
        <div className="appWindow">
            <div className="generalWindow">
                <div className="pastMessages">
                    {
                        postData.map((post, index)=>{
                            return <Post key={index} imgUrl={post.imgurl} username={post.username} content={post.content}/>
                        }).reverse()
                    }
                </div>
                <Form fetchAgain={fetchData} />
            </div>
        </div>
    )
}