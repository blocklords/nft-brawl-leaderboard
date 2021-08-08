import { BigInt } from "@graphprotocol/graph-ts"
import {
  NftBrawl,
  AnnounceAllTimeWinners,
  AnnounceDailyWinners,
  MaxSpendUpdated,
  MinSpendUpdated,
  Minted,
  NftFactorySet,
  OwnershipTransferred,
  PrizeSet,
  Rewarded,
  SessionStarted,
  Spent
} from "../generated/NftBrawl/NftBrawl"
import { ExampleEntity } from "../generated/schema"

export function handleAnnounceAllTimeWinners(
  event: AnnounceAllTimeWinners
): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.sessionId = event.params.sessionId
  entity.mintedWinners = event.params.mintedWinners

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.announcement(...)
  // - contract.balances(...)
  // - contract.crowns(...)
  // - contract.isActive(...)
  // - contract.lastSessionId(...)
  // - contract.maxSpend(...)
  // - contract.minSpend(...)
  // - contract.mintedAllTimeClaimables(...)
  // - contract.mintedAllTimePrizes(...)
  // - contract.nonces(...)
  // - contract.owner(...)
  // - contract.sessions(...)
  // - contract.spentDailyClaimables(...)
  // - contract.spentDailyPrizes(...)
}

export function handleAnnounceDailyWinners(event: AnnounceDailyWinners): void {}

export function handleMaxSpendUpdated(event: MaxSpendUpdated): void {}

export function handleMinSpendUpdated(event: MinSpendUpdated): void {}

export function handleMinted(event: Minted): void {}

export function handleNftFactorySet(event: NftFactorySet): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePrizeSet(event: PrizeSet): void {}

export function handleRewarded(event: Rewarded): void {}

export function handleSessionStarted(event: SessionStarted): void {}

export function handleSpent(event: Spent): void {}
