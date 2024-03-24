import path from 'path';

export function getFilePath(file){
    const filePath = file.path;
    const fileSplit = filePath.split(path.sep);
    // const directoryPath = path.dirname(filePath);
    const finalPath = path.join(fileSplit[1], fileSplit[2]);

    console.log(finalPath)
    return finalPath
}