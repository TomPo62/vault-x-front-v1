import Player from 'lottie-react'

const LottieAnimation = ({
  animationData,
  className,
}: {
  animationData: object
  className?: string
}) => {
  return (
    <div
    className={`w-full h-full flex justify-center items-center p-0 m-0 ${className} text-[#e2e2e2]`}
  >
    <Player
      autoplay
      loop
      animationData={animationData}
      style={{ width: "100%", height: "100%" }}
    />
  </div>
  )
}

export default LottieAnimation
