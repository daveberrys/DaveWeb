<script>
    let selected = $state({});
    let extraInfo = $state("");
    let contact = $state("");
    let submitting = $state(false);
    let submitted = $state(false);

    const groupsOfSelection = [
      { groupName: "Software", items: [
        { name: "Software GUI App", description: "Building a Software GUI App. Tech stack should be below this.", type: "gui", price: 20 },
        { name: "Command Line Interface", description: "Either a simple CLI tool, or a complex one.", type: "cli", price: 5 },
        { name: "Linux Desktop Environment Configs", description: "Create a custom Linux desktop environment configs.", type: "config", price: 7.5 },
        { name: "Backend Server", description: "REST API servers.", type: "server", price: 15 },
      ]},

      { groupName: "Tech Stack", items: [
        { name: "Tauri + JavaScript Framework", description: "Tauri Webapp with your preferred JavaScript framework.", compat: ["gui"], price: 8 },
        { name: "Electron + JavaScript Framework", description: "Electron app with your preferred JavaScript framework.", compat: ["gui"], price: 6 },
        { name: "FastAPI + Python", description: "FastAPI server with Python.", compat: ["server"], price: 2.5 },
        { name: "Flask + Python", description: "Flask server with Python.", compat: ["server"], price: 2.5 },
        { name: "Express + NodeJS", description: "Express server with NodeJS.", compat: ["server", "cli"], price: 3 },
        { name: "Clap + Rust", description: "Clap CLI with Rust.", compat: ["cli"], price: 3 },
        { name: "Cobra + Go", description: "Cobra CLI with Go.", compat: ["cli"], price: 2.5 },
        { name: "Waybar + Mako + Rofi", description: "Waybar, Mako and Rofi configs.", compat: ["config"], price: 1.5 },
      ]},

      { groupName: "AI Usage", items: [
        { name: "Agentic Coding", description: "The whole entire code will be written with AI with serious testing, and prompting.", price: -2 },
        { name: "Yes", description: "I am allowed to use AI to help with coding. This applies to writing with it.", price: 0 },
        { name: "No", description: "You are disabling me from using AI on your commission. No AI will be used.", price: 5 },
        { name: "Half both", description: "I'm half allowed to use AI. I can't use it for writing, but I can use it for helping.", price: 2.5 },
      ]},
    ];

    function selectItem(groupName, itemIndex) {
      if (selected[groupName] === itemIndex) {
        selected[groupName] = undefined;
      } else {
        selected[groupName] = itemIndex;
        if (groupName === "Software") {
          selected["Tech Stack"] = undefined;
        }
      }
    }

    function isSelected(groupName, itemIndex) {
      return selected[groupName] === itemIndex;
    }

    function getSelectedSoftwareType() {
      const softwareGroup = groupsOfSelection[0];
      const idx = selected[softwareGroup.groupName];
      if (idx === undefined) return null;
      return softwareGroup.items[idx].type;
    }

    function isItemDisabled(groupName, item) {
      if (groupName !== "Tech Stack") return false;
      const softwareType = getSelectedSoftwareType();
      if (!softwareType) return true;
      return !item.compat.includes(softwareType);
    }

    function getTotal() {
      let total = 0;
      for (const group of groupsOfSelection) {
        const idx = selected[group.groupName];
        if (idx !== undefined) {
          total += group.items[idx].price;
        }
      }
      return total;
    }

    function getSelectedItems() {
      const result = {};
      for (const group of groupsOfSelection) {
        const idx = selected[group.groupName];
        if (idx !== undefined) {
          result[group.groupName] = group.items[idx].name;
        }
      }
      return result;
    }

    async function handleSubmit() {
      if (!contact.trim()) return;
      submitting = true;

      const payload = {
        selections: getSelectedItems(),
        total: getTotal(),
        extraInfo: extraInfo.trim(),
        contact: contact.trim(),
      };

      try {
        await fetch(`${import.meta.env.PUBLIC_SERVER}/api/commissions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        submitted = true;
      } catch (e) {
        alert("Failed to submit. Please try again.");
      } finally {
        submitting = false;
      }
    }
</script>

<main>
    <div class="center">
        <h1>🔧 Commissions</h1>
        <span>
            <b>I am now available for commissions</b>!
            Select what you want below, <br/>
            send your email or discord username, and
            I will get back to you as soon as possible.
        </span>
    </div>

    {#if submitted}
        <div class="center final" style="margin-top: 2rem;">
            <h2>Thank you!</h2>
            <span>Your commission request has been submitted. I'll get back to you soon.</span>
            <span>For now, check the other pages while you're at it.</span>
        </div>
    {:else}
        <div class="selection">
            {#each groupsOfSelection as group}
                <div class="group">
                    <span class="bigText">{group.groupName}</span>
                    <div class="items">
                        {#each group.items as item, i}
                            {@const disabled = isItemDisabled(group.groupName, item)}
                            <button
                                class="item"
                                class:selected={isSelected(group.groupName, i)}
                                class:disabled
                                disabled={disabled}
                                onclick={() => selectItem(group.groupName, i)}
                                type="button"
                            >
                                <span class="mediumText" style="font-weight: bold">{item.name}</span>
                                <span>{item.description}</span>
                                <span class="price">${item.price}</span>
                            </button>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>

        <div class="total">
            <span class="bigText">Total: ${getTotal()}</span>
            <span>You can send me a Steam Gift Card, Discord Nitro, or anything you can think of.</span>
            <span>I'm not allowing using my Bank account.</span>
        </div>

        <form class="submission" onsubmit={e => { e.preventDefault(); handleSubmit(); }}>
            <div class="field">
                <label for="contact">Email or Discord Username</label>
                <input
                    id="contact"
                    type="text"
                    placeholder="you@example.com or username"
                    bind:value={contact}
                    required
                />
            </div>
            <div class="field">
                <label for="extra">Extra Information</label>
                <textarea
                    id="extra"
                    rows="4"
                    placeholder="Any additional details about your commission..."
                    bind:value={extraInfo}
                ></textarea>
            </div>
            <button class="submit-btn" type="submit" disabled={submitting || !contact.trim()}>
                {submitting ? "Submitting..." : "Submit Commission"}
            </button>
        </form>
    {/if}
</main>

<style>
    .center {
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
    }

    .selection {
        .group {
            display: flex;
            align-items: center;
            flex-direction: column;
            flex-wrap: wrap;
            padding: 20px;

            .items {
                display: flex;
                align-items: stretch;
                padding: 10px;
                flex-wrap: wrap;
                gap: 5px;
                justify-content: center;

                .item {
                    all: unset;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    padding: 16px;
                    border: 2px solid var(--border);
                    border-radius: 8px;
                    background-color: var(--sidebar);
                    color: var(--text);
                    text-decoration: none;
                    width: 20rem;
                    max-width: 100%;
                    transition: border-color 150ms ease, opacity 150ms ease;
                    cursor: pointer;
                    box-sizing: border-box;
                    text-align: left;

                    .price {
                        margin-top: auto;
                        font-weight: bold;
                        color: var(--primary);
                    }
                }

                .item:hover:not(.disabled) {
                    border-color: var(--primary);
                }

                .item.selected {
                    border-color: var(--primary);
                    background-color: color-mix(in srgb, var(--primary) 15%, var(--sidebar));
                }

                .item.disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }
            }
        }
    }

    .total {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding: 1rem 0;
    }

    .submission {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem;
        width: 100%;
        max-width: 40rem;
        margin: 0 auto;

        .field {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            width: 100%;

            label {
                font-weight: bold;
                color: var(--text);
            }

            input, textarea {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid var(--border);
                border-radius: 8px;
                background-color: var(--sidebar);
                color: var(--text);
                font-family: inherit;
                font-size: 1rem;
                box-sizing: border-box;
                transition: border-color 150ms ease;

                &:focus {
                    outline: none;
                    border-color: var(--primary);
                }

                &::placeholder {
                    opacity: 0.5;
                }
            }
        }

        .submit-btn {
            all: unset;
            padding: 0.75rem 2rem;
            border: 2px solid var(--primary);
            border-radius: 8px;
            background-color: var(--primary);
            color: #fff;
            font-weight: bold;
            font-size: 1rem;
            cursor: pointer;
            text-align: center;
            transition: opacity 150ms ease;

            &:hover {
                opacity: 0.85;
            }

            &:disabled {
                opacity: 0.4;
                cursor: not-allowed;
            }
        }
    }

    .final {
        animation: sinWave 1s ease-in-out infinite alternate;
    }

    @keyframes sinWave {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-10px);
        }
    }
</style>
