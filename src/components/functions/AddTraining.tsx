import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import type { Training } from "../types";
import TrainingForm from "../forms/TrainingForm";
import type { CreateTrainingPayload } from "../apis/trainingAPI";

type AddTrainingProps = {
  customerUrl: string;
  handleAdd: (training: CreateTrainingPayload) => void;
};

export default function AddTraining({ customerUrl, handleAdd }: AddTrainingProps) {
  const [open, setOpen] = useState(false);

  const [training, setTraining] = useState<Training>({
    date: "",
    duration: 0,
    activity: "",
    _links: {
      self: { href: "" },
      customer: { href: customerUrl },
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    handleAdd({
      date: training.date,
      duration: training.duration,
      activity: training.activity,
      customer: customerUrl,
    });
    setTraining({
      date: "",
      duration: 0,
      activity: "",
      _links: { self: { href: "" }, customer: { href: customerUrl } },
    });
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        Add Training
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: 'text.primary', fontWeight: 600 }}>Add Training</DialogTitle>

        <TrainingForm training={training} setTraining={setTraining} showCustomerField={false} />

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}