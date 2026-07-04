const Card = ({ children, className = '', style = {}, ...props }) => (
  <div className={`card ${className}`} style={style} {...props}>
    {children}
  </div>
);

export default Card;
