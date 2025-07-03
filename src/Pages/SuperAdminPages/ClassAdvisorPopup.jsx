import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

export default function ClassAdvisorPopup({
  open,
  setOpen,
  teachers,
  onSelect,
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-blue-700">
            Select Class Advisor
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {teachers.map((teacher, idx) => (
            <div
              key={idx}
              className="p-3 border border-gray-300 rounded-lg hover:bg-blue-50 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-800">{teacher.name}</p>
                <p className="text-sm text-gray-500">{teacher.faculty_email}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-blue-700 border-blue-700"
                onClick={() => {
                  onSelect(teacher);
                  setOpen(false);
                }}
              >
                Select
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
