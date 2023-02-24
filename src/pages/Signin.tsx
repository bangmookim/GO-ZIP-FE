import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import createUser from 'libs/client/api/createUser';
import { motion } from 'framer-motion';

interface FormState {
  signInEmail: string;
  signInPassword: string;
  signInNickname: string;
}

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  const onValid = async (data: any) => {
    const {
      signInEmail: email,
      signInNickname: nickname,
      signInPassword: password,
    } = data;

    const res = await createUser({ email, nickname, password });
    console.log(`res : ${res}`);
  };

  return (
    <Container>
      <TopWrapper>
        <Title>Sign in</Title>
        <Form onSubmit={handleSubmit(onValid)}>
          <FormText>
            <div>Email</div>
            <ErrorMessage>
              {errors.signInEmail ? errors.signInEmail.message : null}
            </ErrorMessage>
          </FormText>
          <Input
            errorId={!!errors.signInEmail}
            {...register('signInEmail', {
              required: 'is required',
              validate: {
                hasAlpha: (value) => {
                  const hasAlpha = !!value.match(/[a-zA-Z]/g);

                  return hasAlpha ? true : 'must be include alpha';
                },
                isEmail: (value) => {
                  const isEmail = !!value.match(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                  );

                  return isEmail ? true : 'Is not Email Form';
                },
              },
            })}
            type="text"
            placeholder="Email"
          />

          <FormText>
            <div>NickName</div>
            <ErrorMessage>
              {errors.signInNickname ? errors.signInNickname.message : null}
            </ErrorMessage>
          </FormText>
          <Input
            errorId={!!errors.signInNickname}
            {...register('signInNickname', {
              required: 'is required',
              minLength: {
                value: 4,
                message: 'longer more than 4',
              },
              validate: (value) => {
                const hasAlpha = !!value.match(/[a-zA-Z]/g);

                return hasAlpha ? true : 'must be include alpha';
              },
            })}
            type="text"
            placeholder="NickName"
          />
          <FormText>
            <div>PW</div>
            <ErrorMessage>
              {errors.signInPassword ? errors.signInPassword.message : null}
            </ErrorMessage>
          </FormText>

          <Input
            errorId={!!errors.signInPassword}
            {...register('signInPassword', {
              required: 'is required',
              minLength: {
                value: 4,
                message: 'longer more than 4',
              },
            })}
            type="password"
            placeholder="Password"
          />
          <Submit>create</Submit>
        </Form>
        <SocialText>SignIn with Social</SocialText>
      </TopWrapper>
      <BottomWrapper>
        <SocialText>Or Sign Up Using</SocialText>
        <a href="/login">login</a>
      </BottomWrapper>
    </Container>
  );
};

export default Signin;

const FormText = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.pointColor};
  font-weight: 600;
  font-size: 0.9rem;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 5px;
  gap: 5px;
  align-items: center;
  height: 100px;
  width: 100%;
`;

const SocialText = styled.div`
  margin-bottom: 10px;
  font-weight: 600;
  opacity: 0.7;
`;

const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin-top: 20px;
`;

const TopWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Container = styled(motion.div)`
  position: absolute;
  width: 400px;
  height: 700px;
  border-radius: 5px;
  left: calc(50% - 250px);
  top: calc(50% - 400px);
  color: ${({ theme }) => theme.color};
  box-shadow: 0px 0px 5px ${({ theme }) => theme.color};
  backdrop-filter: blur(3px);
  padding: 50px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: ease-in-out 0.15s;
`;

const Title = styled.div`
  font-size: 30px;
  width: 100%;
  text-align: center;
  font-weight: 600;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const Input = styled.input<{ errorId: boolean }>`
  padding: 15px;
  font-size: 18px;
  margin-bottom: 10px;
  border: none;
  background: none;
  font-weight: 600;
  border-bottom: solid 2px
    ${(props) => (props.errorId ? props.theme.pointColor : props.theme.color)};
  transition: ${({ theme }) => theme.transitionOption};
  border-radius: 10px 10px 0 0;
  color: ${({ theme }) => theme.color};
  :focus {
    outline: none;
    color: ${({ theme }) => theme.background};
    background: ${({ theme }) => theme.color};
  }
`;

const Submit = styled.button`
  margin: 30px 0 30px 0;
  padding: 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border: 2px solid ${({ theme }) => theme.color};
  font-size: 20px;
  transition: ${({ theme }) => theme.transitionOption};
  :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.background};
  }
`;
