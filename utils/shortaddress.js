export const shortenAddress = (address) => 
`${address?.slice(0, 6)}...${address.slice(address.length - 4)}`;

export const parseErrorMessage = (e) => {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error.message;
}