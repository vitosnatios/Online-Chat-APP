export default function Post(props) {
  const anonImgUrl = 'https://static.thenounproject.com/png/3825456-200.png';
  const { imgurl, username, content } = props.post;
  return (
    <div className='message'>
      <img src={imgurl.length > 5 ? imgurl : anonImgUrl} alt='' />
      <div>
        <h5>{username.length > 0 ? username : 'Anônimo'}</h5>
        <p>{content}</p>
      </div>
    </div>
  );
}
