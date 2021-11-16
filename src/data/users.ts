export default (user: string) => {
  const users = {
    coinbase:
      'network season possible inner blue slice enemy call hour romance people magic vessel claw thought assist tobacco buddy master steak clarify broccoli isolate feed',
    userOne:
      'fat sleep parent ticket measure venue try basket amount knee elbow leisure enter old asthma fee lumber measure lava club dinosaur anger insane myself',
  };

  if (!users[user]) throw new Error(`User ${user} not found`);

  return users[user];
};
