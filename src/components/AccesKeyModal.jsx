import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import { useContext } from "react";
import { MyAuthContext } from "../context/AuthContext";

export const AccessKeyModal=({ open, onClose, onSuccess })=>{
  const [value, setValue] = React.useState("");
  const { submitKey } = useContext(MyAuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ok = await submitKey(value);   // boolean visszatérési érték javasolt
    if (ok) {
      onClose();
      onSuccess();                       // ha jó a kulcs → navigate
    } else {
      alert("Hibás kulcs!");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <DialogTitle>Titkos kulcs szükséges</DialogTitle>
        <DialogContent>
          Add meg a kulcsot a művelet folytatásához.
        </DialogContent>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Kulcs</FormLabel>
              <Input
                type="password"
                autoFocus
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </FormControl>

            <Button type="submit">Belépés</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
