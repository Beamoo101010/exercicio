/**
 * PULSO FIT BAIRRO - INTERATIVIDADE & CONVERSÃO
 * Funcionalidades:
 * 1. Filtro rápido interativo de horários e modalidades (Hero)
 * 2. Status em tempo real (Aberto/Fechado com base na hora do cliente)
 * 3. Contador regressivo de urgência promocional
 * 4. Toggle Mensal / Trimestral com cálculo dinâmico de valores
 * 5. Sanfona (Accordion) acessível do FAQ
 * 6. Tooltip e gatilhos de WhatsApp
 * 7. Modais de transparência legal no rodapé
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. FILTRO RÁPIDO DE HORÁRIOS E MODALIDADES (HERO)
     ========================================================================== */
  const filterTime = document.getElementById('filter-time');
  const filterType = document.getElementById('filter-type');
  const resultHeadline = document.getElementById('filter-result-title');
  const resultDesc = document.getElementById('filter-result-desc');
  const filterCta = document.getElementById('filter-cta-btn');

  const filterMatrix = {
    'manha-cedo': {
      'musculacao-rapida': {
        title: 'Musculação Despertar 45 min (05h - 08h)',
        desc: 'Academia tranquila, aparelhos 100% livres e energia renovada antes de entrar no serviço.'
      },
      'queima-cardio': {
        title: 'Cardio & Metabolismo Ativo (05h - 08h)',
        desc: 'Esteiras e bikes livres logo cedo. Comece o dia queimando calorias sem esperar.'
      },
      'coluna-postura': {
        title: 'Alongamento & Fortalecimento Postural Matinal',
        desc: 'Exercícios guiados para quem passa o dia em pé ou carregando peso. Zero impacto.'
      },
      'funcional': {
        title: 'Circuito Funcional Rápido (40 min)',
        desc: 'Agilidade total guiada pelos instrutores para você sair pronto para a batalha do dia.'
      }
    },
    'almoco': {
      'musculacao-rapida': {
        title: 'Treino Express Almoço (11h30 - 14h)',
        desc: 'Treino otimizado de 35 a 45 min com chuveiro quente para você voltar cheiroso ao trabalho.'
      },
      'queima-cardio': {
        title: 'HIIT Almoço Rápido (30 min)',
        desc: 'Treino de alta intensidade, queima acelerada e tempo de sobra para comer com calma.'
      },
      'coluna-postura': {
        title: 'Descompressão da Coluna no Meio do Dia',
        desc: 'Alivie a tensão dos ombros e lombar na pausa do almoço e recupere seu rendimento.'
      },
      'funcional': {
        title: 'Circuito 30 min Almoço',
        desc: 'Foco total sem descanso prolongado. Treine, tome uma ducha e volte pro expediente.'
      }
    },
    'tarde': {
      'musculacao-rapida': {
        title: 'Treino Horário Nobre Tranquilo (14h - 17h)',
        desc: 'O melhor horário do dia: academia com menor fluxo, ar climatizado e atenção exclusiva.'
      },
      'queima-cardio': {
        title: 'Cardio Contínuo sem Disputa (14h - 17h)',
        desc: 'Faça suas esteiras e transport no ritmo que quiser sem revezar máquina.'
      },
      'coluna-postura': {
        title: 'Fortalecimento Completo sem Pressa',
        desc: 'Tempo ideal para o professor tirar suas dúvidas e corrigir cada movimento.'
      },
      'funcional': {
        title: 'Área Funcional Livre (14h - 17h)',
        desc: 'Espaço aberto de sobra com halteres, kettlebells e cordas livres.'
      }
    },
    'pos-trampo': {
      'musculacao-rapida': {
        title: 'Circuito Express Pós-Expediente (17h30 - 20h30)',
        desc: 'Aparelhos duplicados e fichas em pares que garantem treino rápido sem pegar fila.'
      },
      'queima-cardio': {
        title: 'Desestresse Total do Dia (17h30 - 20h30)',
        desc: 'Música motivadora, ambiente alto astral e queima calórica para esquecer o estresse.'
      },
      'coluna-postura': {
        title: 'Alívio da Carga Pesada da Rotina',
        desc: 'Solte as costas e lombar depois de um dia duro de trabalho. Instrutores ao lado.'
      },
      'funcional': {
        title: 'Treino em Grupo das 18h e 19h',
        desc: 'Turma animada, energia contagiante e motivação coletiva para não desanimar.'
      }
    },
    'noite-flex': {
      'musculacao-rapida': {
        title: 'Musculação Noite Tranquila (20h30 - 23h)',
        desc: 'Fluxo diminuindo, som mais ameno e foco total para treinar antes de uma boa noite de sono.'
      },
      'queima-cardio': {
        title: 'Cardio Noturno Relaxante (20h30 - 23h)',
        desc: 'Treine com tranquilidade, tome seu banho quente aqui e vá para casa descansar.'
      },
      'coluna-postura': {
        title: 'Mobilidade & Relaxamento Noturno',
        desc: 'Alongamentos e fortalecimento profundo para destravar o corpo e dormir como um anjo.'
      },
      'funcional': {
        title: 'Circuito Fechamento Noturno',
        desc: 'Feche o dia com sensação de dever cumprido antes das 23h.'
      }
    }
  };

  function updateQuickFilter() {
    if (!filterTime || !filterType) return;
    const timeVal = filterTime.value;
    const typeVal = filterType.value;

    const recommendation = (filterMatrix[timeVal] && filterMatrix[timeVal][typeVal]) 
      ? filterMatrix[timeVal][typeVal] 
      : {
          title: 'Treino Personalizado de 45 min',
          desc: 'Nossos instrutores avaliam seu objetivo e adaptam à sua rotina na hora.'
        };

    resultHeadline.textContent = recommendation.title;
    resultDesc.textContent = recommendation.desc;

    // Atualiza botão com mensagem dinâmica
    const formattedMsg = encodeURIComponent(`Olá! Fiz a simulação de horário no site para "${recommendation.title}" e quero garantir minha Matrícula Zero!`);
    filterCta.href = `https://wa.me/5511999999999?text=${formattedMsg}`;
  }

  if (filterTime && filterType) {
    filterTime.addEventListener('change', updateQuickFilter);
    filterType.addEventListener('change', updateQuickFilter);
    updateQuickFilter();
  }


  /* ==========================================================================
     2. STATUS EM TEMPO REAL (ABERTO OU FECHADO)
     ========================================================================== */
  function updateLiveGymStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTimeInMinutes = hour * 60 + minute;

    let isOpen = false;
    let closingTimeText = '';
    let nextOpenText = '';

    if (day >= 1 && day <= 5) {
      // Segunda a Sexta: 05:00 (300m) às 23:00 (1380m)
      if (currentTimeInMinutes >= 300 && currentTimeInMinutes < 1380) {
        isOpen = true;
        closingTimeText = 'Aberto agora até às 23:00';
      } else {
        isOpen = false;
        nextOpenText = 'Fechado no momento • Abre às 05:00';
      }
    } else if (day === 6) {
      // Sábado: 08:00 (480m) às 18:00 (1080m)
      if (currentTimeInMinutes >= 480 && currentTimeInMinutes < 1080) {
        isOpen = true;
        closingTimeText = 'Aberto hoje até às 18:00';
      } else {
        isOpen = false;
        nextOpenText = 'Fechado • Abre domingo às 08:00';
      }
    } else {
      // Domingo: 08:00 (480m) às 14:00 (840m)
      if (currentTimeInMinutes >= 480 && currentTimeInMinutes < 840) {
        isOpen = true;
        closingTimeText = 'Aberto hoje até às 14:00';
      } else {
        isOpen = false;
        nextOpenText = 'Fechado • Abre segunda às 05:00';
      }
    }

    // Elemento Navbar
    const navStatusText = document.querySelector('#nav-live-status .status-text');
    const navStatusDot = document.querySelector('#nav-live-status .status-dot');
    
    // Elemento Horários Seção
    const liveHoursText = document.getElementById('live-hours-text');
    const liveHoursBadge = document.getElementById('live-hours-badge');

    if (isOpen) {
      if (navStatusText) navStatusText.textContent = closingTimeText;
      if (navStatusDot) {
        navStatusDot.style.backgroundColor = 'var(--color-green-primary)';
      }
      if (liveHoursText) liveHoursText.textContent = '🟢 ' + closingTimeText;
      if (liveHoursBadge) {
        liveHoursBadge.style.backgroundColor = 'var(--color-green-soft)';
        liveHoursBadge.style.color = 'var(--color-green-darker)';
      }
    } else {
      if (navStatusText) navStatusText.textContent = nextOpenText;
      if (navStatusDot) {
        navStatusDot.style.backgroundColor = '#F59E0B'; // Amarelo/laranja suave
      }
      if (liveHoursText) liveHoursText.textContent = '🟡 ' + nextOpenText;
      if (liveHoursBadge) {
        liveHoursBadge.style.backgroundColor = '#FEF3C7';
        liveHoursBadge.style.color = '#B45309';
      }
    }
  }

  updateLiveGymStatus();
  setInterval(updateLiveGymStatus, 60000); // Atualiza a cada 1 minuto


  /* ==========================================================================
     3. CONTADOR REGRESSIVO DE URGÊNCIA PROMOCIONAL
     ========================================================================== */
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  // Inicializa com 4 horas, 32 minutos e 18 segundos ou resgata da sessão
  let countdownSeconds = 4 * 3600 + 32 * 60 + 18;

  function formatTwoDigits(num) {
    return num.toString().padStart(2, '0');
  }

  function updateCountdown() {
    if (countdownSeconds <= 0) {
      // Reinicia sutilmente para não deixar o timer zerado
      countdownSeconds = 3 * 3600 + 45 * 60;
    } else {
      countdownSeconds--;
    }

    const h = Math.floor(countdownSeconds / 3600);
    const m = Math.floor((countdownSeconds % 3600) / 60);
    const s = countdownSeconds % 60;

    if (hoursEl) hoursEl.textContent = formatTwoDigits(h);
    if (minutesEl) minutesEl.textContent = formatTwoDigits(m);
    if (secondsEl) secondsEl.textContent = formatTwoDigits(s);
  }

  setInterval(updateCountdown, 1000);


  /* ==========================================================================
     4. TOGGLE MENSAL / TRIMESTRAL (CARDS DE PLANOS)
     ========================================================================== */
  const billingToggle = document.getElementById('plan-billing-toggle');
  const priceValues = document.querySelectorAll('.price-value');
  const labelMensal = document.getElementById('label-mensal');
  const labelTrimestral = document.getElementById('label-trimestral');

  let isQuarterly = false;

  if (billingToggle) {
    billingToggle.addEventListener('click', () => {
      isQuarterly = !isQuarterly;
      billingToggle.setAttribute('aria-checked', isQuarterly ? 'true' : 'false');

      if (labelMensal && labelTrimestral) {
        if (isQuarterly) {
          labelMensal.style.opacity = '0.6';
          labelTrimestral.style.opacity = '1';
          labelTrimestral.style.fontWeight = '800';
        } else {
          labelMensal.style.opacity = '1';
          labelTrimestral.style.opacity = '0.7';
          labelTrimestral.style.fontWeight = '600';
        }
      }

      // Anima troca de preços
      priceValues.forEach(el => {
        el.style.transform = 'scale(0.85)';
        el.style.opacity = '0';
        setTimeout(() => {
          const newVal = isQuarterly ? el.getAttribute('data-quarterly') : el.getAttribute('data-monthly');
          el.textContent = newVal;
          el.style.transform = 'scale(1)';
          el.style.opacity = '1';
        }, 150);
      });
    });
  }


  /* ==========================================================================
     5. SANFONA (ACCORDION) ACESSÍVEL DO FAQ
     ========================================================================== */
  const accordionButtons = document.querySelectorAll('.accordion-button');

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const parentItem = button.closest('.accordion-item');
      const panel = button.nextElementSibling;
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Fecha todos os outros itens para manter limpo
      document.querySelectorAll('.accordion-item').forEach(item => {
        if (item !== parentItem) {
          item.classList.remove('active');
          const btn = item.querySelector('.accordion-button');
          const pnl = item.querySelector('.accordion-panel');
          if (btn) btn.setAttribute('aria-expanded', 'false');
          if (pnl) pnl.hidden = true;
        }
      });

      // Alterna o item clicado
      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
        parentItem.classList.remove('active');
      } else {
        button.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
        parentItem.classList.add('active');
      }
    });
  });


  /* ==========================================================================
     6. TOOLTIP DO WHATSAPP FLUTUANTE
     ========================================================================== */
  const whatsappTooltip = document.getElementById('whatsapp-tooltip');
  const closeTooltipBtn = document.getElementById('close-whatsapp-tooltip');

  if (closeTooltipBtn && whatsappTooltip) {
    closeTooltipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      whatsappTooltip.style.opacity = '0';
      whatsappTooltip.style.transform = 'scale(0.9)';
      setTimeout(() => {
        whatsappTooltip.style.display = 'none';
      }, 300);
    });
  }


  /* ==========================================================================
     7. MODAL DE TRANSPARÊNCIA E TERMOS LEGAIS
     ========================================================================== */
  const legalModal = document.getElementById('legal-modal');
  const legalModalTitle = document.getElementById('legal-modal-title');
  const legalModalBody = document.getElementById('legal-modal-body');
  const closeLegalModal = document.getElementById('close-legal-modal');
  const btnOkLegal = document.getElementById('btn-ok-legal');

  const linkTermos = document.getElementById('link-termos');
  const linkPrivacidade = document.getElementById('link-privacidade');
  const linkCdc = document.getElementById('link-cdc');

  const legalTexts = {
    termos: {
      title: 'Termos de Uso e Contratação',
      body: `
        <h4>1. Matrícula e Adesão</h4>
        <p>A promoção de <strong>Matrícula R$ 0,00</strong> é válida para novas assinaturas durante o período da campanha promocional. Não há cobrança de taxa de anuidade oculta nem taxas de manutenção extraordinárias.</p>
        <h4>2. Cancelamento Transparente</h4>
        <p>O associado poderá solicitar o cancelamento a qualquer momento mediante aviso prévio de 30 dias na recepção ou via canal oficial de atendimento, sem aplicação de multas rescisórias abusivas.</p>
        <h4>3. Regras de Boa Convivência</h4>
        <p>Prezamos pelo respeito mútuo entre alunos e equipe, guarda de pesos após uso e higienização dos aparelhos com os kits disponibilizados na academia.</p>
      `
    },
    privacidade: {
      title: 'Política de Privacidade e Proteção de Dados (LGPD)',
      body: `
        <h4>1. Coleta de Informações</h4>
        <p>Coletamos apenas dados estritamente necessários para cadastro, controle biométrico/catraca de acesso e contato direto via WhatsApp institucional para avisos sobre seu plano.</p>
        <h4>2. Segurança dos Dados</h4>
        <p>Seus dados cadastrais jamais serão comercializados ou compartilhados com terceiros sem consentimento explícito, em estrito cumprimento à Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>
      `
    },
    cdc: {
      title: 'Compromisso com o Código de Defesa do Consumidor',
      body: `
        <h4>1. Garantia Legal de Satisfação</h4>
        <p>Garantimos o direito de arrependimento em até 7 (sete) dias após a contratação com restituição integral dos valores pagos, conforme o Art. 49 do Código de Defesa do Consumidor.</p>
        <h4>2. Clareza de Preços</h4>
        <p>Todos os preços exibidos representam o valor exato a ser cobrado. Não existem letras miúdas, taxas ocultas ou reajustes imprevistos durante o ciclo contratado.</p>
      `
    }
  };

  function openModal(type) {
    if (!legalModal || !legalTexts[type]) return;
    legalModalTitle.textContent = legalTexts[type].title;
    legalModalBody.innerHTML = legalTexts[type].body;
    legalModal.removeAttribute('hidden');
  }

  function closeModal() {
    if (legalModal) legalModal.setAttribute('hidden', '');
  }

  if (linkTermos) linkTermos.addEventListener('click', (e) => { e.preventDefault(); openModal('termos'); });
  if (linkPrivacidade) linkPrivacidade.addEventListener('click', (e) => { e.preventDefault(); openModal('privacidade'); });
  if (linkCdc) linkCdc.addEventListener('click', (e) => { e.preventDefault(); openModal('cdc'); });

  if (closeLegalModal) closeLegalModal.addEventListener('click', closeModal);
  if (btnOkLegal) btnOkLegal.addEventListener('click', closeModal);

  if (legalModal) {
    legalModal.addEventListener('click', (e) => {
      if (e.target === legalModal) closeModal();
    });
  }

  // Tecla Escape para fechar modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && legalModal && !legalModal.hasAttribute('hidden')) {
      closeModal();
    }
  });


  /* ==========================================================================
     8. SOMBRA DINÂMICA NA NAVBAR AO ROLAR
     ========================================================================== */
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 6px 20px rgba(15, 23, 42, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });

});
