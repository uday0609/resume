import  '../assets/css/Scorebar.css';
const  Scorebar = (props)=>{
const svgScore = props.value;
  return (
    <div className="score-wrap">
      <div className="score">
        <div className="score-bar">
          {/* <div className="placeholder">{progressBar(100)}</div> */}
          <div className="score-circle">{progressBar(svgScore, true)}</div>
        </div>
        <div className="score-value">
          <div className="score-number ">{Math.round(svgScore)}%</div>
          <div className="score-name">Match</div>
        </div>
      </div>
    </div>
  );
}
function progressBar(widthPerc, gradient = false) {
  const radius = 88;
  const dashArray = (Math.PI * radius * widthPerc) / 100;

  return (
    <svg width="200" height="100" >
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"//"#fff7db"
        stroke="lightgrey"//{gradient ? "url(#score-gradient)" : "#e5e5e5"}  
        strokeWidth="24"       // Thickness of the border
        strokeLinecap="round"
        strokeDashoffset={-1 * Math.PI * radius} 
        // strokeDasharray={`${dashArray} 10000`}
      />
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        strokeWidth="24"
        // strokeLinecap="round"
        strokeDashoffset={-1 * Math.PI * radius}
        strokeDasharray={`${dashArray} 10000`}
        stroke={gradient ? "url(#score-gradient)" : "#e5e5e5"}

      ></circle>
     
      {gradient && (
        <defs>
          <linearGradient id="score-gradient">
            <stop offset="0%" stopColor="red" />
            <stop offset="25%" stopColor="orange" />
            <stop offset="100%" stopColor="green" />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
}
export default Scorebar;