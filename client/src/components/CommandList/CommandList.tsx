import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

export default function CommandList() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="command-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        sx={{ backgroundColor: "#8d6e63", ':hover': {
            backgroundColor: '#a1887f'
        } }}
      >
        Commands
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Tooltip
          title="ie: *look north*, *look bob*"
          placement="right"
          slotProps={{
            popper: {
              modifiers: [{ name: "offset", options: { offset: [0, -14] } }],
            },
          }}
          arrow
        >
          <MenuItem onClick={handleClose}>Look</MenuItem>
        </Tooltip>
        <Tooltip
          title="ie: *move north*, *north*, *n*"
          placement="right"
          slotProps={{
            popper: {
              modifiers: [{ name: "offset", options: { offset: [0, -14] } }],
            },
          }}
          arrow
        >
          <MenuItem onClick={handleClose}>Move</MenuItem>
        </Tooltip>
        <Tooltip
          title='ie: *say hello world* *"hello world*'
          placement="right"
          slotProps={{
            popper: {
              modifiers: [{ name: "offset", options: { offset: [0, -14] } }],
            },
          }}
          arrow
        >
          <MenuItem onClick={handleClose}>Say</MenuItem>
        </Tooltip>
        <Tooltip
          title="ie: *whisper bob hello there*"
          placement="right"
          slotProps={{
            popper: {
              modifiers: [{ name: "offset", options: { offset: [0, -14] } }],
            },
          }}
          arrow
        >
          <MenuItem onClick={handleClose}>Whisper</MenuItem>
        </Tooltip>
        <Tooltip
          title="ie: *attack bob*, *kill bob*"
          placement="right"
          slotProps={{
            popper: {
              modifiers: [{ name: "offset", options: { offset: [0, -14] } }],
            },
          }}
          arrow
        >
          <MenuItem onClick={handleClose}>Attack</MenuItem>
        </Tooltip>
        <Tooltip
          title="ie: *who*"
          placement="right"
          slotProps={{
            popper: {
              modifiers: [{ name: "offset", options: { offset: [0, -14] } }],
            },
          }}
          arrow
        >
          <MenuItem onClick={handleClose}>Who</MenuItem>
        </Tooltip>
      </Menu>
    </div>
  );
}
