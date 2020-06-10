import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Button, Icon } from "semantic-ui-react";

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const theme = createMuiTheme({
  direction: "rtl",
});

const Modal = (props) => {
  // const [open, setOpen] = React.useState(true);
  const {Buttons} = props;
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth={props.maxWidth || "xl"}
        fullWidth={true}
        scroll="body"
        PaperComponent={PaperComponent}
        open={props.open}
        className="modal"
      >
        <DialogTitle id="draggable-dialog-title" className="modal-title" style={{ cursor: "move" }}>
          {props.title}
        </DialogTitle>
        <DialogContent dividers className="modal-content">
          {props.children}
        </DialogContent>
        <DialogActions className="modal-actions">
          {props.save ? (
            <Button icon labelPosition="right" color="blue" size="small" onClick={props.save}>
              <Icon name={props.saveIcon ? props.saveIcon : "check"} />
              {props.saveTitle ? props.saveTitle : "تایید"}
            </Button>
          ) : null}
          {Buttons ? <Buttons /> : null}
          <Button icon labelPosition="right" size="small" onClick={props.cancel}>
            انصراف
            <Icon name="close" />
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  save: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default Modal;
