import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function SelectClassAdvisorPopup({
  open,
  onClose,
  advisors,
  onSelect,
}) {
  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Select Class Advisor</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[400px] overflow-auto">
          {advisors.length === 0 ? (
            <p className="text-gray-500 text-sm">No advisors available.</p>
          ) : (
            advisors.map((advisor, index) => {
              console.log("Rendering advisor:", advisor);

              return (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-xl hover:bg-blue-100 transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {advisor?.name || "No Name"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {advisor?.faculty_email || "No Email"}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      console.log("Select clicked:", advisor?.faculty_email);
                      if (advisor?.faculty_email) {
                        onSelect(advisor.faculty_email);
                        onClose();
                      } else {
                        alert("Advisor faculty_email missing. Check data.");
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Select
                  </Button>
                </div>
              );
            })
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
