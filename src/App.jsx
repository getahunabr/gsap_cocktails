import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
  return (
    <div>
      <h1 className="text-3xl text-red-500 h-[100vh]">Hello Gsap!</h1>
    </div>
  );
};

export default App;
