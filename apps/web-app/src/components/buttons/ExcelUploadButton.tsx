import { Transition } from "@headlessui/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import type { FC } from "react";

const useStyles = makeStyles({
  button: {
    backgroundColor: green[500],
    color: "#fff",
    width: "100%",
    height: "64px",
    "&:hover": {
      backgroundColor: green[700],
    },
  },
});

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  disabled?: boolean;
}

const ExcelFileUploadButton: FC<Props> = ({ onClick, disabled = false }) => {
  const classes = useStyles();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <Transition
        show={showTooltip}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <span className="absolute font-sans z-10 -top-7 left-1/2 transform -translate-x-1/2 px-2 py-1 text-sm text-white bg-green-600 rounded-lg shadow-lg">
          Upload Spreadsheet
        </span>
      </Transition>
      <Button
        onClick={onClick}
        disabled={disabled}
        variant="contained"
        className={`${classes.button} px-4 py-3 text-lg font-medium relative`}
        startIcon={<CloudUploadIcon />}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {disabled ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Upload Spreadsheet"
        )}
      </Button>
    </>
  );
};

export default ExcelFileUploadButton;
