import React from 'react'
const fs = require('fs');

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true, error: error };
    }

    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.error(error, errorInfo)
    }

    writeErrorToFile(error, errorInfo) {
      // const jsonData= {"name":"John", "age":30, "car":null};
      // const jsonString = JSON.stringify(jsonData);
      fs.appendFile("./errors.json", errorInfo, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("file saved!");
      }); 

    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
        <>
          <h1>Something went wrong.</h1>
          <p>{this.state.error}</p>
        </>
        );
      }
  
      return this.props.children; 
    }
  }

export default ErrorBoundary;