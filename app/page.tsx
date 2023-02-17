import {
  SunIcon,
  BoltIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

function Homepage() {
  return (
    <div className="h-full sm:h-screen flex flex-col items-center justify-center p-2 text-white">
      <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>

      <div className="flex flex-col  sm:flex-row justify-center space-x-2 text-center  ">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="h-8 w-8" />
            <h2>Examples</h2>
          </div>

          <div className="space-y-2">
            <p className="InfoText">
              Explain quantum computing in simple terms
            </p>
            <p className="InfoText">
              Got any creative ideas for a 10 year old’s birthday?
            </p>
            <p className="InfoText">
              How do I make an HTTP request in Javascript?
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <BoltIcon className="h-8 w-8" />
            <h2>CAPABILITIES</h2>
          </div>

          <div className="space-y-2">
            <p className="InfoText">
              Remembers what user said earlier in the conversation
            </p>
            <p className="InfoText">
              Allows user to provide follow-up corrections
            </p>
            <p className="InfoText">
              Trained to decline inappropriate requests
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2>LIMITATIONS</h2>
          </div>

          <div className="space-y-2">
            <p className="InfoText">
              May occasionally generate incorrect information
            </p>
            <p className="InfoText">
              May occasionally produce harmful instructions or biased content
            </p>
            <p className="InfoText">
              Limited knowledge of world and events after 2021
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
