export default function Post(props) {
  const anonImgUrl = 'https://static.thenounproject.com/png/3825456-200.png';
  return (
    <div className='message'>
      <img src={props.imgUrl.length > 5 ? props.imgUrl : anonImgUrl} alt='' />
      <div>
        <h5>{props.username.length > 0 ? props.username : 'Anônimo'}</h5>
        <p>{props.content}</p>
      </div>
    </div>
  );
}
