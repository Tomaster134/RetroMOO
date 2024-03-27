import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface IProps {
  account: {
    player_name: string;
    is_active: boolean;
    player_id: number;
  };
}

export default function AccountCards(props: IProps) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.account.player_id}
          </Typography>
          <Typography variant="h5" component="div">
            {props.account.player_name}
          </Typography>
          <Typography variant="body2">
            {props.account.is_active ? "Currently Active" : "Inactive"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
