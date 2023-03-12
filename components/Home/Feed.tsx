import InputBox from "./Feed/InputBox";
import Posts from "./Feed/Posts";

const Feed = () => {
	return (
		<>
			<div className="flex-grow max-h-screen overflow-x-hidden overflow-y-scroll scrollbar-hide">
				<div className="">
					<Posts />
					<InputBox />
				</div>
			</div>
		</>
	);
};

export default Feed;
