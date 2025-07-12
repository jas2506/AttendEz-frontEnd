// src/components/UpdateMenteesForm.js

import { useState } from "react";
import { Users, AlertCircle, RefreshCw } from "lucide-react";
import { updateMenteeListAndReturnDetails } from "../../TeacherApi";

function UpdateMenteesForm({ onUpdateSuccess }) {
  const [menteeInput, setMenteeInput] = useState("");
  const [resetList, setResetList] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Split by newlines or commas, filter out empty strings
    const mentee_list = menteeInput
      .split(/[\n,]+/)
      .map((reg) => reg.trim())
      .filter(Boolean);

    if (mentee_list.length === 0) {
      setError("Please enter at least one registration number.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await updateMenteeListAndReturnDetails({
        mentee_list,
        reset: resetList ? "True" : "False",
      });
      // Call the success callback to trigger a refetch in the parent
      onUpdateSuccess();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      setError(errorMessage);
      console.error("Failed to update mentee list:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 max-w-lg w-full space-y-6">
        <div className="text-center">
          <div className="bg-blue-100 text-blue-600 w-20 h-20 flex items-center justify-center rounded-full mx-auto shadow-inner mb-4">
            <Users className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Manage Your Mentee List
          </h2>
          <p className="text-gray-600 mt-2">
            Your mentee list is not set up. Please add your mentees below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="mentee-list"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mentee Registration Numbers
            </label>
            <textarea
              id="mentee-list"
              rows="5"
              value={menteeInput}
              onChange={(e) => setMenteeInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="Enter registration numbers, separated by commas or new lines..."
            />
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="reset"
                name="reset"
                type="checkbox"
                checked={resetList}
                onChange={(e) => setResetList(e.target.checked)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="reset" className="font-medium text-gray-700">
                Reset List
              </label>
              <p className="text-gray-500">
                Check this to replace the entire existing list. Uncheck to
                append to it.
              </p>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Update Mentee List"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateMenteesForm;