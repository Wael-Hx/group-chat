import { makeStyles, Paper, PaperProps, Slide } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: ({ topMargin }: StyledFormProps) =>
      `${topMargin || "auto"} auto auto auto`,
    width: ({ width }: StyledFormProps) => width || "auto",
    fontSize: ".8em",
    padding: ({ padding }: StyledFormProps) => padding || "20px 30px",

    [theme.breakpoints.down("sm")]: {
      margin: "20% auto auto auto",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& >*": {
      marginBottom: 10,
      fontFamily: "Montserrat , Roboto, system-ui",
    },
    "& > div:last-child": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      "& h3": {
        color: "#68adef",
        padding: "0 15px",
        fontWeight: "500",
        textTransform: "uppercase",
      },
    },
  },
}));

const StyledForm = ({
  children,
  slideDirection,
  width,
  disableAnimation,
  topMargin,
  padding,
  ...props
}: StyledFormProps & PaperProps) => {
  const styleProps = { width, topMargin, padding };
  const classes = useStyles(styleProps);
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

interface StyledFormProps {
  slideDirection?: "up" | "left" | "down" | "right";
  width?: string | number;
  disableAnimation?: boolean;
  topMargin?: string;
  padding?: string;
}
