// Consumes a getter to return an array of traps
// and returns a proxy function
export default getTraps => function invoke(){
  const traps   = getTraps()
  // Now we build our chain of proxies from the supplied traps.
  // The first is the base function to fall back to in the absence of any traps.
  const proxies = [ traps[ 0 ] ]

  // Next, execute each subsequent trap wrapper, passing in a reference to the previous function to fall back to
  for( let i = 1; i < traps.length; i++ )
    proxies[ i ] = traps[ i ]( proxies[ i - 1 ] )

  // Finally, execute the last trap with the supplied input
  return proxies[ proxies.length - 1 ].apply( this, arguments )
};
