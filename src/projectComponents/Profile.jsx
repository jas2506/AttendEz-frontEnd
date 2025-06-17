import {User} from "lucide-react";

function Profile(props){

return (

    <button
      onClick={() => console.log("Clicked!")}
      className=" border-2 border-white m-6 cursor-pointer rounded-4xl px-4 py-2 flex items-center gap-3 bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
    >
      <User className="w-6 h-6 text-white" />
      <div className="text-white font-mono text-center leading-tight">
        <p className="font-bold text-sm">Jaswanth</p>
        <p className="text-xs">Student</p>
      </div>
    </button>


);
}

export default Profile