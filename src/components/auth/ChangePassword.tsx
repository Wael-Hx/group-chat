import { CircularProgress, TextField } from "@material-ui/core";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import StyledButton from "../styled/StyledButton";
import StyledForm from "../styled/StyledForm";
import { loggedUserVar, UserVar } from "../../cache";
import { useMutation, useReactiveVar } from "@apollo/client";
import { CHANGE_PASSWORD, FORGOT_PASSWORD } from "../../gql/mutations/users";
import AlertMessage from "../styled/AlertMessage";
import { isToken } from "../../utils/decodeJwt";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", msg: "" });
  const { token } = useParams<{ token: string }>();
  const history = useHistory();
  const auth = useReactiveVar<UserVar>(loggedUserVar);

  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD, {
    onCompleted({ forgotPassword }) {
      setStatus({ type: "success", msg: forgotPassword });
    },
    onError({ message }) {
      setStatus({
        type: "error",
        msg: message,
      });
    },
  });

  const [changePassword, { loading: resetPassLoading }] = useMutation(
    CHANGE_PASSWORD,
    {
      onCompleted({ changePassword }) {
        setStatus({
          type: "success",
          msg: changePassword,
        });
        setTimeout(() => {
          history.push("/auth");
        }, 1500);
      },
      onError({ message }) {
        setStatus({
          type: "error",
          msg: message,
        });
      },
    }
  );

  useEffect(() => {
    if (loading || resetPassLoading) {
      setStatus({
        type: "",
        msg: "",
      });
    }
  }, [loading, resetPassLoading]);

  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changeYourPassword = (e: FormEvent) => {
    e.preventDefault();
    token
      ? changePassword({ variables: { token, newPassword: password } })
      : forgotPassword({ variables: { email } });
  };

  if (auth.loading) {
    return (
      <div className="center">
        <CircularProgress />
      </div>
    );
  }
  if (auth.user || (typeof token !== "undefined" && !isToken(token))) {
    return <Redirect to="/" />;
  }
  return (
    <section className="slide-overflow">
      <StyledForm onSubmit={changeYourPassword} width="20%" topMargin="10%">
        {token ? (
          <TextField
            label="Reset Password"
            name="password"
            onChange={handlePassChange}
            value={password}
            type="password"
            required
            autoComplete="off"
            error={status.type === "error"}
            helperText={status.type === "error" ? status.msg : null}
          />
        ) : (
          <TextField
            label="Type your Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            type="email"
            required
            autoComplete="on"
            error={status.type === "error"}
            helperText={status.type === "error" ? status.msg : null}
          />
        )}
        <StyledButton
          type="submit"
          disabled={loading || resetPassLoading}
          spinner={loading || resetPassLoading}
        >
          Confirm
        </StyledButton>
      </StyledForm>
      {status.type === "success" && (
        <AlertMessage
          onClick={() => setStatus({ type: "", msg: "" })}
          alertText={status.msg}
          messageType={status.type}
        />
      )}
    </section>
  );
};

export default ChangePassword;
