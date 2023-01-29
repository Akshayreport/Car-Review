import Bloglist from './Bloglist';
import useFetch from './useFetch';

const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch('http://localhost:8000/blogs');
  //the colon means that data will now be called blogs e.g data:blogs - we can use blogs to call it

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}

      {blogs && (
        <Bloglist
          blogs={blogs}
          title="All Car blogs!"
          // handleDelete={handleDelete}
        ></Bloglist>
      )}
    </div>
  );
};
export default Home;
