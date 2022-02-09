import * as React from "react"

const SvgComponent = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
    <div className="absolute bottom-28 left-0 big-phone:w-60 big-phone:h-28 pointer-events-none">

        <svg width={502} height={154} xmlns="http://www.w3.org/2000/svg" {...props}>
            <title>{"Group"}</title>
            <defs>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="104.393%" id="a">
                    <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                    <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
                </linearGradient>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="117.847%" id="b">
                    <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                    <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
                </linearGradient>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="113.829%" id="c">
                    <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                    <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
                </linearGradient>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="114.262%" id="d">
                    <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                    <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
                </linearGradient>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="117.847%" id="e">
                    <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                    <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
                </linearGradient>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="131.615%" id="f">
                    <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                    <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
                </linearGradient>
            </defs>
            <g
                transform="translate(0 .105)"
                fillRule="nonzero"
                fill="none"
                opacity={0.498}
            >
                <path
                    d="M0 5.895c45.673 5.841 80.975 44.857 80.975 92.118 0 20.587-6.698 39.61-18.034 55.007L0 153.019V5.895Z"
                    fill="url(#a)"
                />
                <circle fill="url(#b)" cx={196.556} cy={66.961} r={66.961} />
                <path
                    d="M92.961 48.895c36.982 0 66.961 29.98 66.961 66.961 0 13.794-4.17 26.615-11.32 37.268H37.32C30.171 142.471 26 129.65 26 115.856c0-36.982 29.98-66.961 66.961-66.961Z"
                    fill="url(#c)"
                />
                <path
                    d="M434.656 91.895c34.811 0 63.418 26.564 66.656 60.527H368c3.238-33.963 31.845-60.527 66.656-60.527Z"
                    fill="url(#d)"
                />
                <path
                    d="M173.806 69.895c25.298 0 45.806 20.508 45.806 45.806 0 15.078-7.285 28.455-18.528 36.802h-54.556C135.285 144.156 128 130.779 128 115.7c0-25.298 20.508-45.806 45.806-45.806Z"
                    fill="url(#e)"
                />
                <path
                    d="M349.945 115.895c22.257 0 40.807 15.875 44.945 36.92H305c4.137-21.045 22.687-36.92 44.945-36.92Z"
                    fill="url(#f)"
                />
            </g>
        </svg>
    </div>
)

export default SvgComponent
