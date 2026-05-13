import { ArrowUpRight, BarChart3, Filter, Sparkles, Target, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import PredictionCard from "../components/PredictionCard";
import StateMessage from "../components/StateMessage";
import styles from "./Home.module.css";

const statuses = ["all", "open", "closed", "resolved"];
const statusLabels = {
  all: "Todos",
  open: "Abertos",
  closed: "Fechados",
  resolved: "Resolvidos"
};

const intelligencePillars = [
  {
    title: "Comportamento",
    text: "Identifique como consumidores vão pensar, sentir e se comportar."
  },
  {
    title: "Timing",
    text: "Desenvolva os produtos certos no momento exato."
  },
  {
    title: "Confiança",
    text: "Inove com sinais coletivos em vez de ruído."
  },
  {
    title: "Oportunidade",
    text: "Encontre movimentos antes da concorrência."
  },
  {
    title: "Crescimento",
    text: "Impulsione vendas e fidelize no longo prazo."
  },
  {
    title: "Clareza",
    text: "Transforme mercados de previsão em inteligência acionável."
  }
];

const proofPoints = [
  { label: "Sem apostas", value: "Pontos" },
  { label: "Formato", value: "Sim / Não" },
  { label: "Fonte", value: "Markets" }
];

export default function Home() {
  const [predictions, setPredictions] = useState([]);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPredictions = async () => {
    setLoading(true);
    setError("");

    try {
      const query = status === "all" ? "" : `?status=${status}`;
      const { data } = await api.get(`/api/predictions${query}`);
      setPredictions(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We could not reach the market feed. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPredictions();
  }, [status]);

  const openCount = useMemo(
    () => predictions.filter((prediction) => prediction.status === "open").length,
    [predictions]
  );

  const categoryCount = useMemo(
    () => new Set(predictions.map((prediction) => prediction.category)).size,
    [predictions]
  );

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Prediction intelligence</span>
          <h1>Antecipe o futuro com clareza e confiança.</h1>
          <p>
            MakoTrends é um jogo de previsão baseado em pontos que transforma
            mercados de sim ou não em sinais sobre tecnologia, cultura, consumo
            e comportamento.
          </p>
          <div className={styles.heroActions}>
            <a href="#markets">
              Explorar sinais <ArrowUpRight size={18} />
            </a>
            <a href="/rules">Ver regras</a>
          </div>
        </div>

        <aside className={styles.signalPanel} aria-label="MakoTrends signal overview">
          <div className={styles.panelHeader}>
            <span>Signal brief</span>
            <Sparkles size={17} />
          </div>
          <strong>O que a comunidade espera antes da tendência virar consenso?</strong>
          <p>Observe votos, percentuais e resoluções para transformar curiosidade em leitura estratégica.</p>
          <div className={styles.panelStats}>
            <span>
              <b>{openCount}</b>
              abertos
            </span>
            <span>
              <b>{predictions.length}</b>
              monitorados
            </span>
            <span>
              <b>{categoryCount}</b>
              temas
            </span>
          </div>
        </aside>
      </div>

      <section className={styles.intelligence}>
        <div>
          <span className={styles.eyebrow}>Why it matters</span>
          <h2>Dados de previsão para decisões mais inteligentes.</h2>
          <p>
            Cada market é uma pergunta objetiva. Cada voto é um pequeno sinal.
            Juntos, eles ajudam a revelar para onde o mercado pode estar indo.
          </p>
        </div>
        <div className={styles.pillars}>
          {intelligencePillars.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.method}>
        <article>
          <Target size={22} />
          <h2>Sem apostas. Só precisão.</h2>
          <p>
            Usuários votam em perguntas objetivas de sim/não e ganham pontos
            quando os mercados são resolvidos corretamente.
          </p>
        </article>
        <article>
          <BarChart3 size={22} />
          <h2>Sinais coletivos em tempo real.</h2>
          <p>
            Cada voto ajuda a revelar como a comunidade enxerga tendências
            antes de elas ficarem óbvias.
          </p>
        </article>
        <article>
          <Users size={22} />
          <h2>Uma leitura viva do mercado.</h2>
          <p>
            Acompanhe como diferentes públicos interpretam eventos, lançamentos,
            riscos e movimentos culturais.
          </p>
        </article>
      </section>

      <section className={styles.marketSection} id="markets">
        <div className={styles.marketIntro}>
          <div>
            <span className={styles.eyebrow}>Live markets</span>
            <h2>Signals to watch now.</h2>
          </div>
          <div className={styles.proofPoints}>
            {proofPoints.map((point) => (
              <span key={point.label}>
                <b>{point.value}</b>
                {point.label}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.filters}>
          <Filter size={18} />
          {statuses.map((item) => (
            <button
              key={item}
              className={status === item ? styles.active : ""}
              onClick={() => setStatus(item)}
            >
              {statusLabels[item]}
            </button>
          ))}
        </div>
      </section>

      {loading && (
        <StateMessage type="loading" title="Loading live markets">
          Fetching the latest prediction signals and vote distribution.
        </StateMessage>
      )}
      {!loading && error && (
        <StateMessage
          type="error"
          title="Markets are temporarily unavailable"
          actionLabel="Try again"
          onAction={loadPredictions}
        >
          {error}
        </StateMessage>
      )}
      {!loading && !error && predictions.length === 0 && (
        <StateMessage type="empty" title="No markets match this filter">
          Try another status filter or come back when new signals are published.
        </StateMessage>
      )}
      <div className={styles.grid}>
        {predictions.map((prediction) => (
          <PredictionCard key={prediction._id} prediction={prediction} />
        ))}
      </div>
    </section>
  );
}
