import { useEffect, useState } from "react";
import axios from "axios";

const Renderer = ({ stocks, reportURL, title }) => {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const loadData = async () => {
      if (stocks.length === 0) return;

      setLoading(true);

      try {
        const data = (
          await axios.post(reportURL, {
            stocks: stocks.map((stock) => stock.ticker),
          })
        ).data;
        setLoading(false);
        setHtml(data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    loadData();
  }, [stocks, reportURL]);

  return (
    <div className="col-6">
      <h5>{title}</h5>
      {loading && (
        <div
          style={{
            width: "100%",
            height: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Carregando...
        </div>
      )}
      {!loading && (
        <iframe
          style={{ width: "100%", height: 400 }}
          title={title}
          srcdoc={html}
        ></iframe>
      )}
    </div>
  );
};

export default Renderer;
