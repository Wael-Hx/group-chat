import { makeStyles, Paper, PaperProps, Slide } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: ({ topMargin }: any) => `${topMargin || "auto"} auto auto auto`,
    width: ({ width }: any) => (width ? width : "auto"),
    fontSize: ".8em",
    padding: "20px 30px",
    [theme.breakpoints.down("sm")]: {
      margin: "20% auto auto auto",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",

    "& >*": {
      marginBottom: 10,
    },
    "& > div:last-child": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& h3": {
        fontFamily: "Roboto , system-ui",
        color: "#68adef",
        padding: "0 15px",
        fontWeight: "500",
        textTransform: "uppercase",
      },
    },
  },
}));

interface StyledFormProps extends PaperProps {
  slideDirection?: "up" | "left" | "down" | "right";
  width?: string | number;
  disableAnimation?: boolean;
  topMargin?: string;
}

const StyledForm = ({
  children,
  slideDirection,
  width,
  disableAnimation,
  topMargin,
  ...props
}: StyledFormProps) => {
  const classes = useStyles({ width, topMargin });
  if (disableAnimation) {
    return (
      <Paper
        component="form"
        className={`${classes.container} ${classes.form}`}
        {...props}
      >
        {children}
      </Paper>
    );
  }
  return (
    <Slide direction={slideDirection ?? "up"} in mountOnEnter unmountOnExit>
      <Paper
        component="form"
        className={`${classes.container} ${classes.form}`}
        {...props}
      >
        {children}
      </Paper>
    </Slide>
  );
};

export default StyledForm;
