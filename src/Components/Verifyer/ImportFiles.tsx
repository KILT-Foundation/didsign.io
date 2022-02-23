import Dropzone from 'react-dropzone'
import '../../Styles/App.css'
import React, { useCallback, useEffect, useState } from 'react'
import ImportIcon from '../../ImageAssets/iconBIG_import_NEW.svg'
import ReleaseIcon from '../../ImageAssets/iconBIG_import_release.svg'
import { addFile, addFileName } from '../../Features/Signer/FileSlice'
import video from '../../ImageAssets/animation.mp4'
import fast from '../../ImageAssets/animation2.mp4'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import JSZip from 'jszip'
import { getVerifiedData, newUnzip } from '../../Utils/verify-helper'
import { update } from '../../Features/Signer/EndpointSlice'
import { createHash } from '../../Utils/sign-helpers'
import { addHash, selectHash } from '../../Features/Signer/hashSlice'
import { SignDoc } from '../../Utils/types'

export function ImportFiles() {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon)
  const [jws, setJWS] = useState<string>('')
  const [jwsHash, setJwsHash] = useState<string[]>([])
  const hashes = useAppSelector(selectHash)

  const dispatch = useAppDispatch()
  const handleDrag = () => {
    ;(document.getElementById('fast') as HTMLVideoElement).playbackRate = 2.0
    ;(document.getElementById('fast') as HTMLVideoElement).classList.remove(
      'invisible'
    )
    ;(document.getElementById('video') as HTMLVideoElement).classList.add(
      'invisible'
    )

    setImportIcon(ReleaseIcon)
  }
  const handleLeave = () => {
    ;(document.getElementById('video') as HTMLVideoElement).classList.remove(
      'invisible'
    )
    ;(document.getElementById('fast') as HTMLVideoElement).classList.add(
      'invisible'
    )
    setImportIcon(ImportIcon)
  }
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach(async (file: File) => {
        ;(
          document.getElementById('video') as HTMLVideoElement
        ).classList.remove('invisible')
        ;(document.getElementById('fast') as HTMLVideoElement).classList.add(
          'invisible'
        )
        setImportIcon(ImportIcon)
        const fileType = file.name.match(/\.[0-9a-z]+$/i)
        if (fileType?.includes('.zip') && acceptedFiles.length === 1) {
          const unzip = new JSZip()
          const unzipFile = await unzip.loadAsync(file)
          const filenames = Object.keys(unzipFile.files).filter((key) => {
            return !key.match(/^__MACOSX\//)
          })
          if (filenames.includes('signature.didsign')) {
            ;(document.getElementById('dropzone') as HTMLDivElement).draggable =
              false
            dispatch(addFile(file))
            dispatch(addFileName(filenames))
            const sign = await newUnzip(file)
            if (sign === undefined) {
              console.log('error')
              return
            }
            dispatch(update(sign))
            return
          }
        }
        dispatch(addFile(file))
        let doc: SignDoc = { jws: '', hashes: [] }
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = async function () {
          if (file.name === 'signature.didsign') {
            doc = JSON.parse(reader.result as string)
            setJWS(doc.jws)
            setJwsHash(doc.hashes)
          } else {
            const regularFileHash = await createHash(reader.result)
            dispatch(addHash(regularFileHash))
          }
        }
      })
    },
    [jws, jwsHash]
  )
  const verify = async () => {
    const matchedHashes = hashes.filter((hash) => jwsHash.includes(hash))
    if (matchedHashes.length > 0) {
      if (jws != 'Verified' && jwsHash.length > 0) {
        const verifiedSignatureInstance = await getVerifiedData(jws)
        if (verifiedSignatureInstance != undefined) {
          dispatch(update(verifiedSignatureInstance))
          setJWS('Verified')
        }
      }
    }
  }
  useEffect(() => {
    verify()
  }, [jwsHash, hashes])
  return (
    <div
      id="dropzone"
      className=" mt-10 mx-auto w-[48%] big-phone:w-[80%] h-52 relative 2xl:h-80 shadow-inner"
    >
      <video
        id="fast"
        preload="auto"
        className="invisible object-cover rounded-t-lg bg-sky-900 absolute h-full w-full top-0 bottom-0 left-0 right-0 "
        src={fast}
        autoPlay
        loop
        muted
      >
        Your browser does not support the video tag.
      </video>
      <video
        id="video"
        preload="auto"
        className=" shadow-inner object-cover rounded-t-lg bg-sky-900 absolute h-full w-full top-0 bottom-0 left-0 right-0 "
        src={video}
        autoPlay
        loop
        muted
      >
        Your browser does not support the video tag.
      </video>
      <Dropzone
        onDrop={handleDrop}
        onDragLeave={handleLeave}
        onDragEnter={handleDrag}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            id="dropzone"
            {...getRootProps({
              className: 'h-full w-full absolute',
            })}
          >
            <input {...getInputProps()} />
            <div className="flex justify-center items-center w-full h-full">
              {impIcon === ImportIcon && (
                <label className="absolute top-6 font-normal drop-shadow-lg shadow-black pointer-events-none text-white text-center 2xl:text-xl text-md 3xl:text-xl lg:text-[18px] md:text-md sm:text-sm phone:text-xs font-['Overpass']">
                  Drag & drop your files <br />
                  here to Verify
                </label>
              )}
              <img src={impIcon} />
              {impIcon === ImportIcon && (
                <label className="absolute bottom-8 font-normal drop-shadow-lg shadow-black pointer-events-none text-white text-center 2xl:text-xl text-md 3xl:text-xl lg:text-[18px] md:text-md sm:text-sm phone:text-xs font-['Overpass']">
                  Or click to browse your files
                </label>
              )}
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  )
}
