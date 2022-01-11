export const MainDiv = (props) => {
  return (
    <main className="Site-content">
    <div className="container is-fullhd has-text-centered my-6">
      {props.children}   
    </div>
    </main>
  )
}

export const Box = (props) => {
  const className = "box " + props.bulmaStyle;
  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <strong>Polyrthm</strong> by <a href="https://github.com/03kkim">Kyu Hong Kim</a>.
        The <a href="https://github.com/03kkim/polyrhythm-bulma/tree/master">source code</a> is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </div>
    </footer>
  )
}