import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

interface IInventory {
  inventory: {
    id: number;
    name: string;
    group: string;
  }[];
}

export default function InventoryList(props: IInventory) {
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
        sx={{
          backgroundColor: "#8d6e63",
          ":hover": {
            backgroundColor: "#a1887f",
          },
        }}
      >
        Inventory
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
        {props.inventory.length ? (
          <div>
            {props.inventory.map((item) => (
              <Tooltip
                key={item.id}
                title={item.group}
                placement="right"
                slotProps={{
                  popper: {
                    modifiers: [
                      { name: "offset", options: { offset: [0, -14] } },
                    ],
                  },
                }}
                arrow
              >
                <MenuItem onClick={handleClose}>{item.name}</MenuItem>
              </Tooltip>
            ))}
          </div>
        ) : (
          <div>
            <Tooltip
              title="Go steal some stuff!"
              placement="right"
              slotProps={{
                popper: {
                  modifiers: [
                    { name: "offset", options: { offset: [0, -14] } },
                  ],
                },
              }}
              arrow
            >
              <MenuItem onClick={handleClose}>Empty Inventory :(</MenuItem>
            </Tooltip>
          </div>
        )}
      </Menu>
    </div>
  );
}
