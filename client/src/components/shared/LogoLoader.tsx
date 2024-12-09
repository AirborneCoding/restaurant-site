import Img from "./Img";

const LogoLoader = () => {
    return (
        <div className="flex items-center justify-center mt-24 min-h-screen">
            <Img
                src="https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-logo.jpg"
                alt="panda restaurant"
                className="w-24 h-24 animate-bounce rounded-full"
            />
        </div>
    )
};

export default LogoLoader;
