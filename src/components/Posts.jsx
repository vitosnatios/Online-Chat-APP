import Post from './Post';

const Posts = ({ postData }) => {
  return (
    <div className='past-messages'>
      {postData.length > 0
        ? postData
            ?.map((post, index) => {
              return <Post key={index} post={post} />;
            })
            .reverse()
        : 'Loading...'}
    </div>
  );
};

export default Posts;
