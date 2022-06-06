import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Heading,
  Input,
  FormHelperText,
  Flex,
  Center,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useLocalStorage } from "hooks/useLocalStorage";

const Home = () => {
  const router = useRouter();

  const [studioId, setStudioId] = useLocalStorage("studioId", "");
  const [participantId, setParticipantId] = useLocalStorage(
    "participantId",
    ""
  );
  const [role, setRole] = useLocalStorage("participantRole", "host");
  const [errors, setErrors] = useState({ participantId: false });

  const participantInvalid = useCallback(
    () => !participantId || participantId.length < 2,
    [participantId]
  );
  let [joinDisabled, setJoinDisabled] = useState(true);

  // manage join state
  useEffect(() => {
    setJoinDisabled(participantInvalid() || studioId == "");
  }, [participantInvalid, studioId]);

  const handleStudioIdChange = (event: { target: { value: string } }) => {
    const _studioId = event.target.value;
    setStudioId(_studioId);
  };

  const handleParticipantIdChange = (event: { target: { value: string } }) => {
    const _participantId = event.target.value;
    setParticipantId(_participantId);
    setErrors({ participantId: participantInvalid() });
  };

  const handleParticipantRoleChange = (event: {
    target: { value: string };
  }) => {
    const _role = event.target.value;
    setRole(_role);
  };

  const createStudio = async () => {
    const response = await fetch(`/api/studios`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const parsedResponse = await response.json();
    setStudioId(parsedResponse?.id);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    router.push({
      pathname: `/studio/${studioId}`,
      query: { participantId: participantId, role: role },
    });
  }

  return (
    <>
      <Head>
        <title>Mux Studio</title>
        <meta
          name="description"
          content="A live streaming app built on Mux Studio"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Flex direction="column" height="100%" backgroundColor="#333">
        <Center height="100%">
          <Box
            background="white"
            padding="4"
            borderRadius="4"
            width="50%"
            minWidth="400px"
            maxWidth="700px"
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing="4">
                <Heading>Join a Studio</Heading>

                <FormControl isInvalid={errors.participantId}>
                  <FormLabel>Your Name</FormLabel>
                  <Input
                    id="participant_id"
                    value={participantId}
                    onChange={handleParticipantIdChange}
                  />
                  <FormHelperText>This cannot be empty.</FormHelperText>
                </FormControl>

                <FormControl isInvalid={errors.participantId}>
                  <FormLabel>Role</FormLabel>
                  <Select
                    id="participant_role"
                    value={role}
                    onChange={handleParticipantRoleChange}
                  >
                    <option value="host">Host</option>
                    <option value="guest">Guest</option>
                  </Select>
                  <FormHelperText>Please make a selection.</FormHelperText>
                </FormControl>

                <FormControl isInvalid={errors.participantId}>
                  <FormLabel>Studio ID</FormLabel>
                  <Input
                    id="studioId"
                    value={studioId}
                    onChange={handleStudioIdChange}
                  />
                  <FormHelperText>This cannot be empty.</FormHelperText>
                </FormControl>

                <Button onClick={createStudio} width="full">
                  Generate Studio Id
                </Button>

                <Button type="submit" width="full" isDisabled={joinDisabled}>
                  Join
                </Button>
              </Stack>
            </form>
          </Box>
        </Center>
      </Flex>
    </>
  );
};

export default Home;
