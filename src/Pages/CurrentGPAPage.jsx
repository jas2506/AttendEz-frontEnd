import GPAcalccurrent from "../projectComponents/GPAcalccurrent"

function CurrentGPAPage(){
    return <>
        {/* Header Section */}
      <div className="bg-white p-6 rounded-xl flex flex-col items-center justify-center text-center">
        <div>
          <p className="text-2xl font-bold text-blue-700">GPA Calculator</p>
          <p className="text-sm text-gray-600 mt-1">
            Enter details in fields to estimate your GPA for the current semester
          </p>
        </div>
      </div>
        <GPAcalccurrent></GPAcalccurrent>
    </>
}

export default CurrentGPAPage