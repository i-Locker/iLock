import (
    "compress/gzip"
    "io"
    "os"
)

func main() {
    // Open the gzipped file
    gzippedFile, err := os.Open("example.txt.gz")
    if err != nil {
        panic(err)
    }
    defer gzippedFile.Close()

    // Create a new gzip reader
    gzipReader, err := gzip.NewReader(gzippedFile)
    defer gzipReader.Close()

    // Create a new file to hold the uncompressed data
    uncompressedFile, err := os.Create("example.txt")
    if err != nil {
        panic(err)
    }
    defer uncompressedFile.Close()

    // Copy the contents of the gzip reader to the new file
    _, err = io.Copy(uncompressedFile, gzipReader)
    if err != nil {
        panic(err)
    }
}