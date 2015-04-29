/** sedfuncs.js
 * @fileoverview Javascript implementation of sediment-transport calculations
 * @author csherwood@usgs.gov (Chris Sherwood)
 * @version 1-Dec-2014
*/

/*
 Some comments and self-reminders on programming style/choices

 The construct func_name.func_prop is used to set/get additional
 data to/from functions without using global variables.
 
 The construct  var = var || default_var is used to set
 default values for optional arguments.
*/


wstress.cd = 1.2e-3;
/** Wind stress (Large and Pond)
 *@param {number} u10  Wind speed at z=10 m(m/s) 
 *@param {number} rhoa Air density (kg/m3) [optional]
 *@return {number}     Wind stress (Pa)
 *@see See <a href="refs.html">Beyer (1978)</a> p.252.
 */
function wstress(u10, /*optional*/ rhoa){
  rhoa = rhoa|| 1.25;
  wstress.cd = 1.2e-3;
  if(u10>11){
     wstress.cd = .001*(0.49+0.065*u10);
  }
	//console.log("rhoa = ",rhoa);
  return( wstress.cd*rhoa*u10*u10 );
}

/** Convert phi units to meters;
  * mm = 2^(-phi); m = mm/1000
  * @param {number} phi size (phi)
  * @return {number} Dm size (m)
  */
function phi2M( phi ){
   return( 0.001*Math.pow( 2., -phi ) );
}

/** Convert meters to phi units;
  * phi = -log2(mm) = -ln(mm)/ln(2)
  * @param Dm size (m)
  * @return phi size (phi)
  */
function m2Phi( Dm ){
   return( -Math.log(1000.*Dm)/Math.LN2 );
}

/** Returns text describing sediment size class
  * @param {number} phi Size [phi]
  * @return {string} string containing textural text
  */ 
function getSizeText( phi ) {
   var i;
   var sizeText = [
      "Very large boulders",
      "Large boulders",
      "Medium boulders",
      "Small boulders",
      "Large cobbles",
      "Small cobbles",
      "Very coarse pebbles",
      "Medium pebbles",
      "Fine pebbles",
      "Very fine pebbles",
      "Very coarse sand",
      "Coarse sand",
      "Medium sand",
      "Fine sand",
      "Very fine sand",
      "Very coarse silt",
      "Coarse silt",
      "Medium silt",
      "Fine silt",
      "Very fine silt",
      "Clay"];

   i = Math.round(Math.ceil(phi)) + 12;
   if( phi >= 9 ) i=21;
   if( phi < -11) i=0;
   console.log("phi,i=",phi,", ",i);
	 console.log(sizeText[i].toString());
   return sizeText[i];
}
