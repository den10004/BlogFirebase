// eslint-disable-next-line react/prop-types
const CommentIcon = ({ comments }) => {
  return (
    <div>
      {comments.length > 0 ? (
        <svg
          style={{
            width: "20px",
          }}
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          // eslint-disable-next-line react/no-unknown-property
          xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
        >
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
            // eslint-disable-next-line react/no-unknown-property
            sketch:type="MSPage"
          >
            <g
              id="Icon-Set"
              // eslint-disable-next-line react/no-unknown-property
              sketch:type="MSLayerGroup"
              transform="translate(-360.000000, -255.000000)"
              fill="red"
            >
              <path
                d="M390,277 C390,278.463 388.473,280 387,280 L379,280 L376,284 L373,280 L365,280 C363.527,280 362,278.463 362,277 L362,260 C362,258.537 363.527,257 365,257 L387,257 C388.473,257 390,258.537 390,260 L390,277 L390,277 Z M386.667,255 L365.333,255 C362.388,255 360,257.371 360,260.297 L360,277.187 C360,280.111 362.055,282 365,282 L371.639,282 L376,287.001 L380.361,282 L387,282 C389.945,282 392,280.111 392,277.187 L392,260.297 C392,257.371 389.612,255 386.667,255 L386.667,255 Z"
                id="comment-5"
                // eslint-disable-next-line react/no-unknown-property
                sketch:type="MSShapeGroup"
              ></path>
            </g>
          </g>
        </svg>
      ) : (
        <svg
          style={{
            width: "20px",
          }}
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          // eslint-disable-next-line react/no-unknown-property
          xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
        >
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
            // eslint-disable-next-line react/no-unknown-property
            sketch:type="MSPage"
          >
            <g
              id="Icon-Set"
              // eslint-disable-next-line react/no-unknown-property
              sketch:type="MSLayerGroup"
              transform="translate(-360.000000, -255.000000)"
              fill="black"
            >
              <path
                d="M390,277 C390,278.463 388.473,280 387,280 L379,280 L376,284 L373,280 L365,280 C363.527,280 362,278.463 362,277 L362,260 C362,258.537 363.527,257 365,257 L387,257 C388.473,257 390,258.537 390,260 L390,277 L390,277 Z M386.667,255 L365.333,255 C362.388,255 360,257.371 360,260.297 L360,277.187 C360,280.111 362.055,282 365,282 L371.639,282 L376,287.001 L380.361,282 L387,282 C389.945,282 392,280.111 392,277.187 L392,260.297 C392,257.371 389.612,255 386.667,255 L386.667,255 Z"
                id="comment-5"
                // eslint-disable-next-line react/no-unknown-property
                sketch:type="MSShapeGroup"
              ></path>
            </g>
          </g>
        </svg>
      )}
      &nbsp;
      <span style={{ color: "black" }}> {comments.length} </span>
    </div>
  );
};

export default CommentIcon;
