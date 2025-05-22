#!/usr/bin/env node

import { Command } from "commander";
import { ethers } from "ethers";
import chalk from "chalk";
import 'dotenv/config';
import pkg from "./package.json" assert { type: "json" };

const program = new Command();

const DEFAULT_RPC_URL = process.env.RPC_URL || "https://mainnet.infura.io/v3/API_KEY";

program
  .name("ens-check")
  .version(pkg.version)
  .description("Check availability of ENS names or reverse lookup ENS name by address")
  .option("-n, --network <url>", "Ethereum RPC URL", DEFAULT_RPC_URL)
  .option("-r, --reverse <address>", "Ethereum address for reverse ENS lookup")
  .argument("[names...]", "ENS names to check (e.g. vitalik.eth)")
  .action(async (names, options) => {
    const provider = new ethers.JsonRpcProvider(options.network);

    if (options.reverse) {
      // Reverse lookup mode
      try {
        const name = await provider.lookupAddress(options.reverse);
        if (name) {
          console.log(chalk.green(`🔄 Address ${options.reverse} resolves to ENS name: ${chalk.bold(name)}`));
        } else {
          console.log(chalk.yellow(`⚠️ No ENS name found for address ${options.reverse}`));
        }
      } catch (err) {
        console.error(chalk.red(`❌ Error during reverse lookup: ${err.message}`));
      }
      return; // exit after reverse lookup
    }

    // Normal ENS name availability check
    if (!names.length) {
      console.log(chalk.red("❌ Please provide at least one ENS name or use --reverse option."));
      process.exit(1);
    }

    for (const name of names) {
      if (!name.endsWith(".eth")) {
        console.log(chalk.yellow(`⚠️ Skipped ${name} (not a .eth name)`));
        continue;
      }
      try {
        const address = await provider.resolveName(name);
        if (address) {
          console.log(chalk.red(`❌ Taken  ${name} -> ${chalk.gray(address)}`));
        } else {
          console.log(chalk.green(`✅ Available  ${name}`));
        }
      } catch (err) {
        console.error(chalk.yellow(`⚠️ Error ${name}: ${err.message}`));
      }
    }
  });

program.parse(process.argv);
