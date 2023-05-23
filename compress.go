import (
	    "compress/gzip"
	    "io"
	    "os"
	)
	
	func main() {
	    // Open the original file
	    originalFile, err := os.Open("example.txt")
	    if err != nil {
	        panic(err)
	    }
	    defer originalFile.Close()
	
	    // Create a new gzipped file
	    gzippedFile, err := os.Create("example.txt.gz")
	    if err != nil {
	        panic(err)
	    }
	    defer gzippedFile.Close()
	
	    // Create a new gzip writer
	    gzipWriter := gzip.NewWriter(gzippedFile)
	    defer gzipWriter.Close()
	
	    // Copy the contents of the original file to the gzip writer
	    _, err = io.Copy(gzipWriter, originalFile)
	    if err != nil {
	        panic(err)
	    }
	
	    // Flush the gzip writer to ensure all data is written
	    gzipWriter.Flush()
	}